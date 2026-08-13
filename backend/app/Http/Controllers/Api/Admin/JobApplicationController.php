<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = JobApplication::with(['vacancy.company'])
            ->when($request->vacancy_id, fn($q) => $q->where('vacancy_id', $request->vacancy_id))
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->latest();

        return response()->json($query->paginate(20));
    }

    public function show($id)
    {
        return response()->json(JobApplication::with(['vacancy.company'])->findOrFail($id));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
            'notes'  => 'nullable|string|max:500',
        ]);

        $application = JobApplication::findOrFail($id);
        $application->update([
            'status' => $request->status,
            'notes'  => $request->notes,
        ]);

        return response()->json([
            'message'     => 'Status lamaran diperbarui.',
            'application' => $application,
        ]);
    }
}
