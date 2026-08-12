<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use App\Models\Vacancy;

class JobApplicationController extends Controller
{
    public function apply(Request $request, $id)
    {
        $vacancy = Vacancy::findOrFail($id);

        if (!$vacancy->is_active) {
            return response()->json(['message' => 'Lowongan ini sudah ditutup.'], 400);
        }

        $request->validate([
            'cv_file' => 'required|file|mimes:pdf|max:5120', // PDF Max 5MB
            'cover_letter' => 'nullable|string'
        ]);

        $path = $request->file('cv_file')->store('job_applications/cv', 'public');

        $application = JobApplication::create([
            'vacancy_id' => $vacancy->id,
            'user_id' => $request->user()->id,
            'cv_path' => $path,
            'cover_letter' => $request->cover_letter,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Lamaran berhasil dikirim.',
            'data' => $application
        ], 201);
    }
}
