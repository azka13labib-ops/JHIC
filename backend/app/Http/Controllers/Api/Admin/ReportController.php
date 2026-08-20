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
        ]);

        $report = Report::findOrFail($id);
        $report->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'Status laporan berhasil diperbarui.',
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
