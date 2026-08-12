<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInquiryRequest;
use App\Services\BludService;

class InquiryController extends Controller
{
    protected $bludService;

    public function __construct(BludService $bludService)
    {
        $this->bludService = $bludService;
    }

    public function store(StoreInquiryRequest $request)
    {
        $inquiry = $this->bludService->submitInquiry($request->validated());

        return response()->json([
            'message' => 'Inquiry berhasil dikirim. Tim kami akan segera menghubungi Anda.',
            'data' => $inquiry
        ], 201);
    }
}