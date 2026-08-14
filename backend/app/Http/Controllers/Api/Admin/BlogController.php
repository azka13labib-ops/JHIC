<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blog = Blog::orderBy('created_at', 'desc')->get();
        return response()->json($blog);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string', // max 2MB
        ]);

        $imagePath = null;

        $blog = Blog::create([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.blog');

        return response()->json($blog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);



        $blog->update([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.blog');

        return response()->json($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        

        $blog->delete();
        Cache::forget('api.blog');

        \Illuminate\Support\Facades\Cache::forget('api.blogs');
        return response()->json(['message' => 'Blog berhasil dihapus.']);
    }
}
