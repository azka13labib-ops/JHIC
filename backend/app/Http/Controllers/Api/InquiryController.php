<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inquiry;
use App\Models\Product;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        $inquiry = new Inquiry($validated);
        $inquiry->user_id = auth('sanctum')->id(); // will be null if not logged in
        $inquiry->save();

        return response()->json([
            'message' => 'Inquiry submitted successfully.',
            'data' => $inquiry
        ], 201);
    }
}
