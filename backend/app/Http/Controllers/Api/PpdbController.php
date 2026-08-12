<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Registration;
use App\Models\RegistrationDocument;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use App\Jobs\SendPpdbNotification;

class PpdbController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'nisn' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:L,P',
            'address' => 'required|string',
            'previous_school' => 'required|string|max:255',
            'major_choice' => 'required|string|max:255',
        ]);

        // Check if user already registered
        $existing = Registration::where('user_id', $request->user()->id)->first();
        if ($existing) {
            return response()->json(['message' => 'Anda sudah melakukan pendaftaran.'], 400);
        }

        $registrationNumber = 'PPDB-' . date('Y') . '-' . strtoupper(Str::random(6));

        $registration = Registration::create([
            'user_id' => $request->user()->id,
            'registration_number' => $registrationNumber,
            'full_name' => $validated['full_name'],
            'nisn' => Crypt::encryptString($validated['nisn']), // Encrypt NISN
            'date_of_birth' => $validated['date_of_birth'],
            'gender' => $validated['gender'],
            'address' => $validated['address'],
            'previous_school' => $validated['previous_school'],
            'major_choice' => $validated['major_choice'],
            'status' => 'pending'
        ]);

        // Dispatch background job for email simulation
        SendPpdbNotification::dispatch($registration->toArray());

        return response()->json([
            'message' => 'Formulir PPDB berhasil disubmit.',
            'data' => $registration
        ], 201);
    }

    public function uploadDoc(Request $request)
    {
        $request->validate([
            'type' => 'required|in:kk,akta,ijazah',
            'file' => 'required|file|mimes:jpg,png,pdf|max:2048' // Max 2MB
        ]);

        $registration = Registration::where('user_id', $request->user()->id)->first();
        if (!$registration) {
            return response()->json(['message' => 'Silakan isi formulir PPDB terlebih dahulu.'], 400);
        }

        $path = $request->file('file')->store('ppdb_documents', 'public');

        $doc = RegistrationDocument::updateOrCreate(
            ['registration_id' => $registration->id, 'document_type' => $request->type],
            ['file_path' => $path]
        );

        return response()->json([
            'message' => 'Dokumen berhasil diunggah.',
            'data' => $doc
        ]);
    }

    public function status(Request $request)
    {
        $registration = Registration::with('documents')->where('user_id', $request->user()->id)->first();
        
        if (!$registration) {
            return response()->json([
                'status' => 'not_registered',
                'message' => 'Belum ada data pendaftaran.'
            ]);
        }

        return response()->json([
            'status' => 'registered',
            'data' => $registration
        ]);
    }
}
