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

    public function show($id)
    {
        return response()->json(Achievement::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $achievement = Achievement::findOrFail($id);
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'level'       => 'required|in:sekolah,kota,provinsi,nasional,internasional',
            'year'        => 'required|integer|min:2000|max:2100',
            'image'       => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'description', 'level', 'year']);

        if ($request->hasFile('image')) {
            if ($achievement->image_path) {
                Storage::disk('public')->delete($achievement->image_path);
            }
            $data['image_path'] = $request->file('image')->store('achievements', 'public');
        }

        $achievement->update($data);
        Cache::forget('api.achievements');

        return response()->json($achievement);
    }

    public function destroy($id)
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
