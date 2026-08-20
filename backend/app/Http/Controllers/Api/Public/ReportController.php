<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'message' => 'required|string',
        ]);

        $ticketId = 'REP-' . strtoupper(Str::random(8));

        $report = Report::create([
            'ticket_id' => $ticketId,
            'category' => $validated['category'],
            'message' => $validated['message'],
            'status' => 'Pending',
        ]);

        return response()->json([
            'message' => 'Laporan berhasil dikirim.',
            'ticket_id' => $report->ticket_id,
        ], 201);
    }

    public function status($ticketId)
    {
        $report = Report::where('ticket_id', $ticketId)->first();

        if (!$report) {
            return response()->json(['message' => 'Laporan tidak ditemukan.'], 404);
        }

        return response()->json([
            'data' => [
                'ticket_id' => $report->ticket_id,
                'category' => $report->category,
                'status' => $report->status,
                'created_at' => $report->created_at,
            ]
        ]);
    }
}
