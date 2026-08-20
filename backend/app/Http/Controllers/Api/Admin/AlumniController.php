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
            'photo'           => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'testimonial'     => 'nullable|string',
        ]);

        $data = $request->only(['name', 'graduation_year', 'major', 'current_job', 'company', 'testimonial']);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('alumni', 'public');
            $data['image_path'] = url('storage/' . $path);
        }

        $alumni = Alumni::create($data);
        \Illuminate\Support\Facades\Cache::forget('api.alumnis');

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
            'photo'           => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'testimonial'     => 'nullable|string',
        ]);

        $data = $request->only(['name', 'graduation_year', 'major', 'current_job', 'company', 'testimonial']);

        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($alumni->image_path) {
                $oldPath = str_replace(url('storage') . '/', '', $alumni->image_path);
                \Illuminate\Support\Facades\Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('photo')->store('alumni', 'public');
            $data['image_path'] = url('storage/' . $path);
        }

        $alumni->update($data);
        \Illuminate\Support\Facades\Cache::forget('api.alumnis');

        return response()->json($alumni);
    }

    public function destroy($id)
    {
        Alumni::findOrFail($id)->delete();
        Cache::forget('api.alumnis');
        return response()->json(['message' => 'Data alumni berhasil dihapus.']);
    }
}
