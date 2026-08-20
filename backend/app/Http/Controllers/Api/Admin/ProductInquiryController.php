<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductInquiry;
use Illuminate\Http\Request;

class ProductInquiryController extends Controller
{
    public function index()
    {
        $inquiries = ProductInquiry::with('product')->latest()->get();
        return response()->json($inquiries);
    }

    public function show(ProductInquiry $productInquiry)
    {
        $productInquiry->load('product');
        return response()->json($productInquiry);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processed,completed'
        ]);

        $inquiry = ProductInquiry::findOrFail($id);
        $inquiry->update([
            'status' => $request->status
        ]);

        return response()->json($inquiry);
    }

    public function destroy($id)
    {
        $inquiry = ProductInquiry::findOrFail($id);
        $inquiry->delete();

        return response()->json(null, 204);
    }
}
