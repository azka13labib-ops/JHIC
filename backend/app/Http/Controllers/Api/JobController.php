<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vacancy;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Vacancy::with('company')->where('is_active', true);

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $jobs = $query->latest()->paginate(10);

        // Map over data to format logo path
        $jobs->getCollection()->transform(function ($job) {
            if ($job->company && $job->company->logo_path) {
                $job->company->logo_path = asset('storage/' . $job->company->logo_path);
            }
            return $job;
        });

        return response()->json($jobs);
    }

    public function show($id)
    {
        $job = Vacancy::with('company')->findOrFail($id);
        
        if ($job->company && $job->company->logo_path) {
            $job->company->logo_path = asset('storage/' . $job->company->logo_path);
        }

        return response()->json([
            'data' => $job
        ]);
    }
}
