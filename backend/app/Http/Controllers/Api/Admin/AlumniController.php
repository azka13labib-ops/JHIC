<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AlumniController extends Controller
{
    public function index()
    {
        $alumni = Alumni::orderByDesc('graduation_year')->orderByDesc('id')->get();
        return response()->json($alumni);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'            => 'required|string|max:255',
            'graduation_year' => 'required|integer|min:2000|max:2100',
            'major'           => 'nullable|string|max:255',
            'current_job'     => 'nullable|string|max:255',
            'company'         => 'nullable|string|max:255',
            'photo_url'       => 'nullable|url|max:500',
            'testimonial'     => 'nullable|string',
        ]);

        $alumni = Alumni::create($request->only(['name', 'graduation_year', 'major', 'current_job', 'company', 'photo_url', 'testimonial']));
        Cache::forget('api.alumnis');

        return response()->json($alumni, 201);
    }

    public function show($id)
    {
        return response()->json(Alumni::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $alumni = Alumni::findOrFail($id);
        $request->validate([
            'name'            => 'required|string|max:255',
            'graduation_year' => 'required|integer|min:2000|max:2100',
            'major'           => 'nullable|string|max:255',
            'current_job'     => 'nullable|string|max:255',
            'company'         => 'nullable|string|max:255',
            'photo_url'       => 'nullable|url|max:500',
            'testimonial'     => 'nullable|string',
        ]);

        $alumni->update($request->only(['name', 'graduation_year', 'major', 'current_job', 'company', 'photo_url', 'testimonial']));
        Cache::forget('api.alumnis');

        return response()->json($alumni);
    }

    public function destroy($id)
    {
        Alumni::findOrFail($id)->delete();
        Cache::forget('api.alumnis');
        return response()->json(['message' => 'Data alumni berhasil dihapus.']);
    }
}
