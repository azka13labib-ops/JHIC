<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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
            'title'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'level'        => 'required|string|max:100',
            'year'         => 'required|integer|min:2000|max:2100',
            'student_name' => 'nullable|string|max:255',
        ]);

        $achievement = Achievement::create($request->only(['title', 'description', 'level', 'year', 'student_name']));
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
            'title'        => 'required|string|max:255',
            'description'  => 'nullable|string',
            'level'        => 'required|string|max:100',
            'year'         => 'required|integer|min:2000|max:2100',
            'student_name' => 'nullable|string|max:255',
        ]);

        $achievement->update($request->only(['title', 'description', 'level', 'year', 'student_name']));
        Cache::forget('api.achievements');

        return response()->json($achievement);
    }

    public function destroy($id)
    {
        Achievement::findOrFail($id)->delete();
        Cache::forget('api.achievements');
        return response()->json(['message' => 'Prestasi berhasil dihapus.']);
    }
}
