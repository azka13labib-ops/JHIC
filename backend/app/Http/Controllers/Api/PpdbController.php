<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePpdbRequest;
use App\Http\Requests\UploadDocPpdbRequest;
use App\Services\PpdbService;
use Illuminate\Http\Request;

class PpdbController extends Controller
{
    protected $ppdbService;

    public function __construct(PpdbService $ppdbService)
    {
        $this->ppdbService = $ppdbService;
    }

    public function submit(StorePpdbRequest $request)
    {
        try {
            $registration = $this->ppdbService->submitRegistration($request->validated(), $request->user());
            return response()->json([
                'message' => 'Formulir PPDB berhasil disubmit.',
                'data' => $registration
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function uploadDoc(UploadDocPpdbRequest $request)
    {
        try {
            $doc = $this->ppdbService->uploadDocument($request->validated(), $request->user(), $request->file('file'));
            return response()->json([
                'message' => 'Dokumen berhasil diunggah.',
                'data' => $doc
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function status(Request $request)
    {
        $registration = $this->ppdbService->getStatus($request->user());
        
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