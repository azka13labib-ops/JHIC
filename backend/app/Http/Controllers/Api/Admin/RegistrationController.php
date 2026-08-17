<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = Registration::with('documents')
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('full_name', 'like', "%{$request->search}%")
                        ->orWhere('registration_number', 'like', "%{$request->search}%")
                        ->orWhere('nisn', 'like', "%{$request->search}%");
                });
            })
            ->latest();

        return response()->json($query->paginate(20));
    }

    public function show($id)
    {
        return response()->json(Registration::with('documents')->findOrFail($id));
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,verified,accepted,rejected',
            'notes'  => 'nullable|string|max:500',
        ]);

        $registration = Registration::findOrFail($id);
        $registration->status = $request->status;
        if ($request->filled('notes')) {
            $registration->notes = $request->notes;
        }
        $registration->save();

        return response()->json([
            'message'      => 'Status pendaftaran diperbarui.',
            'registration' => $registration,
        ]);
    }

    public function exportCsv(): StreamedResponse
    {
        $registrations = Registration::orderByDesc('created_at')->get();

        $headers = [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="pendaftar-ppdb.csv"',
        ];

        $columns = ['No Pendaftaran', 'Nama Lengkap', 'NISN', 'Asal Sekolah', 'Jurusan', 'Status', 'Tanggal Daftar'];

        $callback = function () use ($registrations, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            foreach ($registrations as $reg) {
                $sanitize = function($val) {
                    return preg_match('/^[=\-\+@]/', (string)$val) ? "'" . $val : $val;
                };
                fputcsv($file, [
                    $reg->registration_number,
                    $sanitize($reg->full_name),
                    $reg->nisn,
                    $sanitize($reg->previous_school),
                    $reg->major_choice,
                    $reg->status,
                    $reg->created_at->format('d/m/Y'),
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
