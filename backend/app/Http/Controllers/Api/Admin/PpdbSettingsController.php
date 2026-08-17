<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PpdbSettingsController extends Controller
{
    public function getSettings()
    {
        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = SchoolProfile::create([
                'name' => 'SMA PGRI 1 Lumajang',
                'is_ppdb_open' => true,
                'ppdb_academic_year' => '2026/2027',
                'ppdb_start_date' => '2026-07-01',
                'ppdb_end_date' => '2026-08-31',
                'ppdb_announcement_date' => '2026-09-10',
                'ppdb_closed_message' => 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup. Terima kasih atas antusiasme pendaftar.',
            ]);
        }

        return response()->json([
            'is_open'            => (bool) ($profile->is_ppdb_open ?? true),
            'academic_year'      => $profile->ppdb_academic_year ?? '2026/2027',
            'registration_start' => $profile->ppdb_start_date ? $profile->ppdb_start_date->format('Y-m-d') : '2026-07-01',
            'registration_end'   => $profile->ppdb_end_date ? $profile->ppdb_end_date->format('Y-m-d') : '2026-08-31',
            'announcement_date'  => $profile->ppdb_announcement_date ? $profile->ppdb_announcement_date->format('Y-m-d') : '2026-09-10',
            'closed_message'     => $profile->ppdb_closed_message ?? 'Pendaftaran PPDB SMA PGRI 1 Lumajang saat ini sedang ditutup.',
        ]);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'is_open'            => 'required|boolean',
            'academic_year'      => 'nullable|string|max:50',
            'registration_start' => 'nullable|date',
            'registration_end'   => 'nullable|date',
            'announcement_date'  => 'nullable|date',
            'closed_message'     => 'nullable|string|max:1000',
        ]);

        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = new SchoolProfile();
            $profile->name = 'SMA PGRI 1 Lumajang';
        }

        $profile->is_ppdb_open = $request->is_open;
        if ($request->filled('academic_year')) $profile->ppdb_academic_year = $request->academic_year;
        if ($request->filled('registration_start')) $profile->ppdb_start_date = $request->registration_start;
        if ($request->filled('registration_end')) $profile->ppdb_end_date = $request->registration_end;
        if ($request->filled('announcement_date')) $profile->ppdb_announcement_date = $request->announcement_date;
        if ($request->filled('closed_message')) $profile->ppdb_closed_message = $request->closed_message;
        $profile->save();

        Cache::forget('api.school-info');
        Cache::forget('api.landing_composite');

        return response()->json([
            'message'  => 'Pengaturan PPDB berhasil diperbarui.',
            'settings' => [
                'is_open'            => (bool) $profile->is_ppdb_open,
                'academic_year'      => $profile->ppdb_academic_year,
                'registration_start' => $profile->ppdb_start_date?->format('Y-m-d'),
                'registration_end'   => $profile->ppdb_end_date?->format('Y-m-d'),
                'announcement_date'  => $profile->ppdb_announcement_date?->format('Y-m-d'),
                'closed_message'     => $profile->ppdb_closed_message,
            ]
        ]);
    }

    public function toggleStatus()
    {
        $profile = SchoolProfile::first();
        if (!$profile) {
            $profile = new SchoolProfile();
            $profile->name = 'SMA PGRI 1 Lumajang';
            $profile->is_ppdb_open = true;
        }

        $profile->is_ppdb_open = !$profile->is_ppdb_open;
        $profile->save();

        Cache::forget('api.school-info');
        Cache::forget('api.landing_composite');

        $statusText = $profile->is_ppdb_open ? 'DIBUKA' : 'DITUTUP';
        return response()->json([
            'message' => "Pendaftaran PPDB berhasil di-{$statusText}.",
            'is_open' => (bool) $profile->is_ppdb_open,
        ]);
    }
}
