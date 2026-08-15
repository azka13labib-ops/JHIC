<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Opinion;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class OpinionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $opinion = Opinion::orderBy('created_at', 'desc')->get();
        return response()->json($opinion);
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
            $imagePath = $request->file('image')->store('opinion', 'public');
        }

        $authorName = $request->user()?->name ?? 'Guru / Penulis SMA PGRI 1';

        $opinion = Opinion::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'image' => $imagePath,
            'author' => $authorName,
            'published_at' => now(),
        ]);

        Cache::forget('api.opinion');
        Cache::forget('api.opinions');

        return response()->json($opinion, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $opinion = Opinion::findOrFail($id);
        return response()->json($opinion);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $opinion = Opinion::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:5120',
        ]);

        $imagePath = $opinion->image;
        if ($request->hasFile('image')) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('opinion', 'public');
        }

        $opinion->update([
            'title'   => $request->title,
            'content' => $request->content,
            'image'   => $imagePath,
        ]);

        Cache::forget('api.opinion');
        Cache::forget('api.opinions');

        return response()->json($opinion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $opinion = Opinion::findOrFail($id);

        if ($opinion->image && Storage::disk('public')->exists($opinion->image)) {
            Storage::disk('public')->delete($opinion->image);
        }

        $opinion->delete();
        Cache::forget('api.opinion');
        Cache::forget('api.opinions');

        return response()->json(['message' => 'Opini berhasil dihapus.']);
    }
}
