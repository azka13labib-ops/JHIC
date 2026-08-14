<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudentWork;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class StudentWorkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $student_works = StudentWork::orderBy('created_at', 'desc')->get();
        return response()->json($student_works);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'student_name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('student_works', 'public');
        }

        $student_works = StudentWork::create([
            'title' => $request->title,
            'student_name' => $request->student_name,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        Cache::forget('api.student_works');

        return response()->json($student_works, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student_works = StudentWork::findOrFail($id);
        return response()->json($student_works);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $student_works = StudentWork::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'student_name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = $student_works->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('student_works', 'public');
        }

        $student_works->update([
            'title' => $request->title,
            // Only update slug if title changed significantly, but for simplicity we keep old slug or generate new
            'content' => $request->content,
            'image' => $imagePath,
        ]);

        Cache::forget('api.student_works');

        return response()->json($student_works);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $student_works = StudentWork::findOrFail($id);

        if ($student_works->image && Storage::disk('public')->exists($student_works->image)) {
            Storage::disk('public')->delete($student_works->image);
        }

        $student_works->delete();
        Cache::forget('api.student_works');

        \Illuminate\Support\Facades\Cache::forget('api.student_works');
        return response()->json(['message' => 'Karya Siswa berhasil dihapus.']);
    }
}
