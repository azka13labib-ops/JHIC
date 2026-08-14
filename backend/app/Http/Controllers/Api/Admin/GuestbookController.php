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
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'institution' => 'nullable|string|max:255',
            'message'     => 'required|string|max:2000',
        ]);

        $guestbook = Guestbook::create($validated);

        Cache::forget('api.guestbooks');

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

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'institution' => 'nullable|string|max:255',
            'message'     => 'required|string|max:2000',
        ]);

        $guestbook->update($validated);

        Cache::forget('api.guestbooks');

        return response()->json($guestbook);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $guestbook = Guestbook::findOrFail($id);
        $guestbook->delete();

        Cache::forget('api.guestbooks');
        return response()->json(['message' => 'Buku tamu berhasil dihapus.']);
    }
}
