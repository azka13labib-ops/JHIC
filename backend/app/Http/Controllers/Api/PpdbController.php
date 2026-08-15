<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePpdbRequest;
use App\Http\Requests\UploadDocPpdbRequest;
use App\Models\Registration;
use App\Models\RegistrationDocument;
use App\Models\User;
use App\Services\PpdbService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
        return response()->json([
            'data' => [
                'registration_start' => '2026-07-01',
                'registration_end'   => '2026-08-31',
                'announcement_date'  => '2026-09-10',
                'requirements'       => [
                    'Ijazah / Surat Keterangan Lulus SMP',
                    'Kartu Keluarga (KK)',
                    'Akta Kelahiran',
                    'Pas Foto 3x4 (background merah)',
                    'NISN',
                ],
                'tracks'             => ['Jalur Reguler', 'Jalur Prestasi', 'Jalur Afirmasi'],
            ]
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
                'major_choice'        => $reg->major_choice,
                'status'              => $reg->status,
                'notes'               => $reg->notes,
                'created_at'          => $reg->created_at,
            ]
        ]);
    }

    public function submit(StorePpdbRequest $request)
    {
        try {
            $user = $request->user();

            // If not logged in, auto-link or create student user
            if (!$user) {
                $email = $request->input('email') ?: 'student.' . Str::slug($request->input('full_name')) . '.' . uniqid() . '@student.smapgri1lmj.sch.id';
                $user = User::firstOrCreate(
                    ['email' => $email],
                    [
                        'name'     => $request->input('full_name'),
                        'password' => Hash::make($request->input('nisn') ?: Str::random(12)),
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
            return response()->json(['message' => $e->getMessage() ?: 'Terjadi kesalahan pada pendaftaran, silakan coba lagi.'], 422);
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