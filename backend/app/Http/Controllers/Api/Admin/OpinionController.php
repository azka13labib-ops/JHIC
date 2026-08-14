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
            'content' => 'required|string', // max 2MB
        ]);

        $imagePath = null;

        $opinion = Opinion::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            
            'author' => $request->user()->name,
            'published_at' => now(), // for now, auto publish
        ]);

        Cache::forget('api.opinion');

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
        ]);

        $imagePath = null;
            $imagePath = $request->file('image')->store('opinion', 'public');
        }

        $opinion->update([
            'title' => $request->title,
            // Only update slug if title changed significantly, but for simplicity we keep old slug or generate new
            'content' => $request->content,
            
        ]);

        Cache::forget('api.opinion');

        return response()->json($opinion);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $opinion = Opinion::findOrFail($id);

        

        $opinion->delete();
        Cache::forget('api.opinion');

        \Illuminate\Support\Facades\Cache::forget('api.opinions');
        return response()->json(['message' => 'Opini berhasil dihapus.']);
    }
}
