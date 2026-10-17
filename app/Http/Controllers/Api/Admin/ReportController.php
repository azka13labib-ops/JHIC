<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::orderBy('created_at', 'desc')->get();
        return response()->json(['data' => $reports]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,Proses,Selesai',
            'admin_response' => 'nullable|string|max:5000',
        ]);

        $report = Report::findOrFail($id);
        
        $updateData = [
            'status' => $validated['status'],
        ];

        if ($request->has('admin_response')) {
            $updateData['admin_response'] = $validated['admin_response'];
            $updateData['responded_at'] = now();
        }

        $report->update($updateData);

        return response()->json([
            'message' => 'Status dan tanggapan laporan berhasil diperbarui.',
            'data' => $report
        ]);
    }

    public function destroy($id)
    {
        $report = Report::findOrFail($id);
        $report->delete();

        return response()->json([
            'message' => 'Laporan berhasil dihapus.'
        ]);
    }
}
