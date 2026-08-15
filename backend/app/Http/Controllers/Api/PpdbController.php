<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePpdbRequest;
use App\Http\Requests\UploadDocPpdbRequest;
use App\Models\Registration;
use App\Models\RegistrationDocument;
use App\Models\SchoolProfile;
use App\Models\User;
use App\Services\PpdbService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PpdbController extends Controller
{
    protected $ppdbService;

    public function __construct(PpdbService $ppdbService)
    {
        $this->ppdbService = $ppdbService;
    }

    public function info()
    {
        $profile = SchoolProfile::first();

        $isOpen = $profile ? ($profile->is_ppdb_open ?? true) : true;
        $academicYear = $profile?->ppdb_academic_year ?? '2026/2027';
        $startDate = $profile?->ppdb_start_date ? $profile->ppdb_start_date->format('Y-m-d') : '2026-07-01';
        $endDate = $profile?->ppdb_end_date ? $profile->ppdb_end_date->format('Y-m-d') : '2026-08-31';
        $announcementDate = $profile?->ppdb_announcement_date ? $profile->ppdb_announcement_date->format('Y-m-d') : '2026-09-10';
        $closedMessage = $profile?->ppdb_closed_message ?? 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup. Pantau pengumuman resmi berkala.';

        return response()->json([
            'data' => [
                'is_open'            => $isOpen,
                'academic_year'      => $academicYear,
                'registration_start' => $startDate,
                'registration_end'   => $endDate,
                'announcement_date'  => $announcementDate,
                'closed_message'     => $closedMessage,
                'requirements'       => [
                    'Ijazah / Surat Keterangan Lulus SMP/MTs',
                    'Kartu Keluarga (KK)',
                    'Akta Kelahiran',
                    'Pas Foto 3x4 (background merah)',
                    'NISN (Nomor Induk Siswa Nasional)',
                ],
                'tracks'             => ['Jalur Reguler', 'Jalur Prestasi', 'Jalur Afirmasi'],
            ]
        ]);
    }

    public function getSettings()
    {
        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = SchoolProfile::create([
                'name' => 'SMA PGRI 1 Lumajang',
                'is_ppdb_open' => true,
                'ppdb_academic_year' => '2026/2027',
                'ppdb_start_date' => '2026-07-01',
                'ppdb_end_date' => '2026-08-31',
                'ppdb_announcement_date' => '2026-09-10',
                'ppdb_closed_message' => 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup. Terima kasih atas antusiasme pendaftar.',
            ]);
        }

        return response()->json([
            'is_open'            => (bool) ($profile->is_ppdb_open ?? true),
            'academic_year'      => $profile->ppdb_academic_year ?? '2026/2027',
            'registration_start' => $profile->ppdb_start_date ? $profile->ppdb_start_date->format('Y-m-d') : '2026-07-01',
            'registration_end'   => $profile->ppdb_end_date ? $profile->ppdb_end_date->format('Y-m-d') : '2026-08-31',
            'announcement_date'  => $profile->ppdb_announcement_date ? $profile->ppdb_announcement_date->format('Y-m-d') : '2026-09-10',
            'closed_message'     => $profile->ppdb_closed_message ?? 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup.',
        ]);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'is_open'            => 'required|boolean',
            'academic_year'      => 'nullable|string|max:50',
            'registration_start' => 'nullable|date',
            'registration_end'   => 'nullable|date',
            'announcement_date'  => 'nullable|date',
            'closed_message'     => 'nullable|string|max:1000',
        ]);

        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = new SchoolProfile();
            $profile->name = 'SMA PGRI 1 Lumajang';
        }

        $profile->is_ppdb_open = $request->is_open;
        if ($request->filled('academic_year')) $profile->ppdb_academic_year = $request->academic_year;
        if ($request->filled('registration_start')) $profile->ppdb_start_date = $request->registration_start;
        if ($request->filled('registration_end')) $profile->ppdb_end_date = $request->registration_end;
        if ($request->filled('announcement_date')) $profile->ppdb_announcement_date = $request->announcement_date;
        if ($request->filled('closed_message')) $profile->ppdb_closed_message = $request->closed_message;
        $profile->save();

        Cache::forget('api.school-info');
        Cache::forget('api.landing_composite');

        return response()->json([
            'message'  => 'Pengaturan PPDB berhasil diperbarui.',
            'settings' => [
                'is_open'            => (bool) $profile->is_ppdb_open,
                'academic_year'      => $profile->ppdb_academic_year,
                'registration_start' => $profile->ppdb_start_date?->format('Y-m-d'),
                'registration_end'   => $profile->ppdb_end_date?->format('Y-m-d'),
                'announcement_date'  => $profile->ppdb_announcement_date?->format('Y-m-d'),
                'closed_message'     => $profile->ppdb_closed_message,
            ]
        ]);
    }

    public function toggleStatus()
    {
        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = new SchoolProfile();
            $profile->name = 'SMA PGRI 1 Lumajang';
            $profile->is_ppdb_open = true;
        }

        $profile->is_ppdb_open = !$profile->is_ppdb_open;
        $profile->save();

        Cache::forget('api.school-info');
        Cache::forget('api.landing_composite');

        $statusText = $profile->is_ppdb_open ? 'DIBUKA' : 'DITUTUP';
        return response()->json([
            'message' => "Pendaftaran PPDB berhasil di-{$statusText}.",
            'is_open' => (bool) $profile->is_ppdb_open,
        ]);
    }

    public function checkStatus(Request $request)
    {
        $q = $request->query('q');
        if (!$q) {
            return response()->json(['message' => 'Parameter nomor pendaftaran diperlukan.'], 422);
        }

        $reg = Registration::where('registration_number', $q)
            ->orWhere('nisn', $q)
            ->first();

        if (!$reg) {
            return response()->json(['message' => 'Data pendaftaran tidak ditemukan.'], 404);
        }

        // Return only non-sensitive status information
        return response()->json([
            'data' => [
                'registration_number' => $reg->registration_number,
                'full_name'           => $reg->full_name,
                'nisn'                => $reg->nisn ? (strlen($reg->nisn) > 6 ? substr($reg->nisn, 0, 4) . '****' . substr($reg->nisn, -2) : $reg->nisn) : null,
                'previous_school'     => $reg->previous_school,
                'major_choice'        => $reg->major_choice ?: 'Fase E (Umum)',
                'status'              => $reg->status,
                'notes'               => $reg->notes,
                'created_at'          => $reg->created_at,
            ]
        ]);
    }

    public function submit(StorePpdbRequest $request)
    {
        try {
            $profile = SchoolProfile::first();
            $isOpen = $profile ? ($profile->is_ppdb_open ?? true) : true;

            if (!$isOpen) {
                return response()->json([
                    'message' => $profile?->ppdb_closed_message ?: 'Mohon maaf, pendaftaran PPDB saat ini sedang ditutup.'
                ], 403);
            }

            $user = $request->user();

            // If not logged in, auto-link or create student user with secure random credentials
            if (!$user) {
                $email = $request->input('email') ?: 'student.' . Str::slug($request->input('full_name')) . '.' . uniqid() . '@student.smapgri1lmj.sch.id';
                $user = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name'     => $request->input('full_name'),
                        'password' => Hash::make(Str::random(24)),
                        'role'     => 'student',
                    ]
                );
            }

            $registration = $this->ppdbService->submitRegistration($request->validated(), $user);
            return response()->json([
                'message'             => 'Formulir PPDB berhasil disubmit.',
                'registration_number' => $registration->registration_number,
                'data'                => $registration
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (\Exception $e) {
            Log::error('PPDB submit error', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Terjadi kendala saat memproses pendaftaran. Silakan periksa kembali isian Anda atau hubungi panitia PPDB.'
            ], 422);
        }
    }

    public function uploadDoc(UploadDocPpdbRequest $request)
    {
        try {
            $doc = $this->ppdbService->uploadDocument($request->validated(), $request->user(), $request->file('file'));
            return response()->json([
                'message' => 'Dokumen berhasil diunggah.',
                'data'    => $doc
            ]);
        } catch (\Exception $e) {
            Log::error('PPDB upload error', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Gagal mengunggah dokumen, silakan coba lagi.'], 500);
        }
    }

    public function status(Request $request)
    {
        $registration = $this->ppdbService->getStatus($request->user());
        
        if (!$registration) {
            return response()->json([
                'status'  => 'not_registered',
                'message' => 'Belum ada data pendaftaran.'
            ]);
        }

        return response()->json([
            'status' => 'registered',
            'data'   => $registration
        ]);
    }

    public function downloadDoc($id, Request $request)
    {
        $doc = RegistrationDocument::with('registration')->findOrFail($id);
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Only admin or the document owner can access the file
        if ($user->role !== 'admin' && $doc->registration->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden. Unauthorized access to document.'], 403);
        }

        $disk = Storage::disk('local')->exists($doc->file_path) ? 'local' : 'public';

        if (!Storage::disk($disk)->exists($doc->file_path)) {
            return response()->json(['message' => 'Berkas dokumen tidak ditemukan.'], 404);
        }

        $filename = 'dokumen-' . $doc->type . '-' . $doc->registration->registration_number . '.' . pathinfo($doc->file_path, PATHINFO_EXTENSION);

        return response()->download(
            Storage::disk($disk)->path($doc->file_path),
            $filename,
            [
                'X-Content-Type-Options' => 'nosniff',
            ]
        );
    }
}