<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use App\Models\News;
use App\Models\Product;
use App\Models\Vacancy;
use App\Models\JobApplication;

class DashboardController extends Controller
{
    public function stats()
    {
        $stats = [
            'ppdb' => [
                'total'    => Registration::count(),
                'pending'  => Registration::where('status', 'pending')->count(),
                'accepted' => Registration::where('status', 'accepted')->count(),
                'rejected' => Registration::where('status', 'rejected')->count(),
            ],
            'news' => [
                'total' => News::count(),
            ],
            'products' => [
                'total'  => Product::count(),
                'active' => Product::where('is_active', true)->count(),
            ],
            'jobs' => [
                'total'  => Vacancy::count(),
                'active' => Vacancy::where('is_active', true)->count(),
            ],
            'applications' => [
                'total'   => JobApplication::count(),
                'pending' => JobApplication::where('status', 'pending')->count(),
            ],
            'recent_registrations' => Registration::latest()->limit(5)->get([
                'id', 'registration_number', 'full_name', 'major_choice', 'status', 'created_at',
            ]),
        ];

        return response()->json($stats);
    }
}
