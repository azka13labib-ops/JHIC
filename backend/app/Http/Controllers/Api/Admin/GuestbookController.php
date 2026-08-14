<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guestbook;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class GuestbookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $guestbook = Guestbook::orderBy('created_at', 'desc')->get();
        return response()->json($guestbook);
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

        $guestbook = Guestbook::create([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.guestbook');

        return response()->json($guestbook, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        return response()->json($guestbook);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $guestbook = Guestbook::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $imagePath = null;
            $imagePath = $request->file('image')->store('guestbook', 'public');
        }

        $guestbook->update([
            'title' => $request->title,
            'url' => $request->url,
        ]);

        Cache::forget('api.guestbook');

        return response()->json($guestbook);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $guestbook = Guestbook::findOrFail($id);

        

        $guestbook->delete();
        Cache::forget('api.guestbook');

        \Illuminate\Support\Facades\Cache::forget('api.guestbooks');
        return response()->json(['message' => 'Guestbook berhasil dihapus.']);
    }
}
