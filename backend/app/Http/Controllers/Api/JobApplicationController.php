<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApplyJobRequest;
use App\Models\JobApplication;
use App\Services\BkkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    protected $bkkService;

    public function __construct(BkkService $bkkService)
    {
        $this->bkkService = $bkkService;
    }

    public function apply(ApplyJobRequest $request, $id)
    {
        try {
            $application = $this->bkkService->applyJob($id, $request->validated(), $request->user(), $request->file('cv_file'));

            return response()->json([
                'message' => 'Lamaran berhasil dikirim.',
                'data' => $application
            ], 201);
        } catch (\Exception $e) {
            Log::error('Job application error', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Gagal mengirim lamaran, silakan coba lagi.'], 500);
        }
    }

    public function downloadCv($id, Request $request)
    {
        $application = JobApplication::findOrFail($id);
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Only admin or the applicant can download the CV
        if ($user->role !== 'admin' && $application->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden. Unauthorized access to document.'], 403);
        }

        $filePath = $application->cv_path ?: $application->cv_file_path;

        if (!$filePath) {
            return response()->json(['message' => 'CV tidak ditemukan.'], 404);
        }

        $disk = Storage::disk('local')->exists($filePath) ? 'local' : 'public';

        if (!Storage::disk($disk)->exists($filePath)) {
            return response()->json(['message' => 'Berkas CV tidak ditemukan di penyimpanan.'], 404);
        }

        $filename = 'cv-pelamar-' . $application->id . '.' . pathinfo($filePath, PATHINFO_EXTENSION);

        return response()->download(
            Storage::disk($disk)->path($filePath),
            $filename,
            [
                'X-Content-Type-Options' => 'nosniff',
            ]
        );
    }
}