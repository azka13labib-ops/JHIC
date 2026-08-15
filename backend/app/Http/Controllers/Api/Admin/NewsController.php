<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::with('author:id,name')
            ->orderByDesc('is_pinned')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($news);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'     => 'required|string|max:255',
            'content'   => 'required|string',
            'image'     => 'nullable|image|max:2048', // max 2MB
            'is_pinned' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news', 'public');
        }

        $news = News::create([
            'title'        => $request->title,
            'slug'         => Str::slug($request->title) . '-' . uniqid(),
            'content'      => $request->content,
            'image_path'   => $imagePath,
            'is_pinned'    => $request->boolean('is_pinned'),
            'author_id'    => $request->user()->id,
            'published_at' => now(),
        ]);

        Cache::forget('api.news');

        return response()->json($news, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $request->validate([
            'title'     => 'required|string|max:255',
            'content'   => 'required|string',
            'image'     => 'nullable|image|max:2048',
            'is_pinned' => 'nullable|boolean',
        ]);

        $imagePath = $news->image_path;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('news', 'public');
        }

        $news->update([
            'title'      => $request->title,
            'content'    => $request->content,
            'image_path' => $imagePath,
            'is_pinned'  => $request->has('is_pinned') ? $request->boolean('is_pinned') : $news->is_pinned,
        ]);

        Cache::forget('api.news');

        return response()->json($news);
    }

    /**
     * Toggle pinned status of news.
     */
    public function togglePin($id)
    {
        $news = News::findOrFail($id);
        $news->is_pinned = !$news->is_pinned;
        $news->save();

        Cache::forget('api.news');

        return response()->json([
            'message'   => $news->is_pinned ? 'Berita berhasil disematkan di baris terdepan.' : 'Sematkan berita telah dilepas.',
            'is_pinned' => $news->is_pinned,
            'news'      => $news,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);

        if ($news->image_path && Storage::disk('public')->exists($news->image_path)) {
            Storage::disk('public')->delete($news->image_path);
        }

        $news->delete();
        Cache::forget('api.news');

        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }
}
