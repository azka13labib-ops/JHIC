<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AnnouncementController extends Controller
{
    public function index()
    {
        return response()->json(Announcement::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'content'   => 'required|string',
            'type'      => 'nullable|in:info,warning,success',
            'is_active' => 'boolean',
        ]);

        $announcement = Announcement::create($request->only(['title', 'content', 'type', 'is_active']));
        Cache::forget('api.announcements');

        return response()->json($announcement, 201);
    }

    public function show($id)
    {
        return response()->json(Announcement::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $announcement = Announcement::findOrFail($id);
        $request->validate([
            'title'     => 'required|string|max:255',
            'content'   => 'required|string',
            'type'      => 'nullable|in:info,warning,success',
            'is_active' => 'boolean',
        ]);

        $announcement->update($request->only(['title', 'content', 'type', 'is_active']));
        Cache::forget('api.announcements');

        return response()->json($announcement);
    }

    public function destroy($id)
    {
        Announcement::findOrFail($id)->delete();
        Cache::forget('api.announcements');
        return response()->json(['message' => 'Pengumuman berhasil dihapus.']);
    }
}
