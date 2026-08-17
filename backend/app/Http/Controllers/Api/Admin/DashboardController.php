<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\News;
use App\Models\Agenda;
use App\Models\Achievement;

class DashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            'ppdb' => [
                'total'    => Registration::count(),
                'pending'  => Registration::where('status', 'pending')->count(),
                'verified' => Registration::where('status', 'verified')->count(),
                'accepted' => Registration::where('status', 'accepted')->count(),
                'rejected' => Registration::where('status', 'rejected')->count(),
            ],
            'news' => [
                'total' => News::count(),
            ],
            'agendas' => [
                'total' => Agenda::count(),
            ],
            'achievements' => [
                'total' => Achievement::count(),
            ],
            'recent_registrations' => Registration::latest()->limit(5)->get([
                'id', 'registration_number', 'full_name', 'major_choice', 'status', 'created_at',
            ]),
        ];

        return response()->json($stats);
    }
}
