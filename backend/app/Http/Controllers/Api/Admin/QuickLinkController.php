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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url'   => 'required|url|max:255',
        ]);

        $quickLink = QuickLink::create($validated);

        Cache::forget('api.quick_links');

        return response()->json($quickLink, 201);
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

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url'   => 'required|url|max:255',
        ]);

        $quickLink->update($validated);

        Cache::forget('api.quick_links');

        return response()->json($quickLink);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $quickLink = QuickLink::findOrFail($id);
        $quickLink->delete();

        Cache::forget('api.quick_links');
        return response()->json(['message' => 'QuickLink berhasil dihapus.']);
    }
}
