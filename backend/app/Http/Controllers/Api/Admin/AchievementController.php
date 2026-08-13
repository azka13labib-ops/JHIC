<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class AchievementController extends Controller
{
    public function index()
    {
        $achievements = Achievement::orderByDesc('year')->orderByDesc('id')->get();
        return response()->json($achievements);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'level'       => 'required|in:sekolah,kota,provinsi,nasional,internasional',
            'year'        => 'required|integer|min:2000|max:2100',
            'image'       => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'level', 'year']);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('achievements', 'public');
        }

        $achievement = Achievement::create($data);
        Cache::forget('api.achievements');

        return response()->json($achievement, 201);
    }

    public function show(int $id)
    {
        $achievement = Achievement::findOrFail($id);
        return response()->json(['data' => $achievement]);
    }

    public function update(Request $request, int $id)
    {
        $achievement = Achievement::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'level' => 'required|string|max:100',
            'year' => 'required|integer',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($achievement->image_path) {
                Storage::disk('public')->delete($achievement->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('achievements', 'public');
        }

        $achievement->update($validated);
        return response()->json(['message' => 'Achievement updated successfully']);
    }

    public function destroy(int $id)
    {
        $achievement = Achievement::findOrFail($id);
        if ($achievement->image_path) {
            Storage::disk('public')->delete($achievement->image_path);
        }
        $achievement->delete();
        Cache::forget('api.achievements');
        return response()->json(['message' => 'Prestasi berhasil dihapus.']);
    }
}
