<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ApplyJobRequest;
use App\Services\BkkService;

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
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}