<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $article = Article::orderBy('created_at', 'desc')->get();
        return response()->json($article);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('article', 'public');
        }

        $authorName = $request->user()?->name ?? 'Admin SMA PGRI 1';

        $article = Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'image' => $imagePath,
            'author' => $authorName,
            'published_at' => now(),
        ]);

        Cache::forget('api.article');
        Cache::forget('api.articles');

        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('article', 'public');
        }

        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
        ]);

        Cache::forget('api.article');
        Cache::forget('api.articles');

        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $article = Article::findOrFail($id);

        if ($article->image && Storage::disk('public')->exists($article->image)) {
            Storage::disk('public')->delete($article->image);
        }

        $article->delete();
        Cache::forget('api.article');
        Cache::forget('api.articles');

        return response()->json(['message' => 'Artikel berhasil dihapus.']);
    }
}
