<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuickLink;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class QuickLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quickLink = QuickLink::orderBy('created_at', 'desc')->get();
        return response()->json($quickLink);
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

        $quickLink = QuickLink::create([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.quick_link');

        return response()->json($quick_link, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $quickLink = QuickLink::findOrFail($id);
        return response()->json($quickLink);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $quickLink = QuickLink::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $imagePath = null;
            $imagePath = $request->file('image')->store('quick_link', 'public');
        }

        $quickLink->update([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.quick_link');

        return response()->json($quickLink);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $quickLink = QuickLink::findOrFail($id);

        

        $quick_link->delete();
        Cache::forget('api.quick_link');

        \Illuminate\Support\Facades\Cache::forget('api.quick_links');
        return response()->json(['message' => 'QuickLink berhasil dihapus.']);
    }
}
