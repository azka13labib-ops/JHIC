<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class AgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agenda = Agenda::with('author:id,name')->orderBy('created_at', 'desc')->get();
        return response()->json($agenda);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('agenda', 'public');
        }

        $agenda = Agenda::create([
            'title' => $request->title,
            'date' => $request->date,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        Cache::forget('api.agenda');

        return response()->json($agenda, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $agenda = Agenda::findOrFail($id);
        return response()->json($agenda);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $agenda = Agenda::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = $agenda->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('agenda', 'public');
        }

        $agenda->update([
            'title' => $request->title,
            'date' => $request->date,
            'location' => $request->location,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        Cache::forget('api.agenda');

        return response()->json($agenda);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $agenda = Agenda::findOrFail($id);

        if ($agenda->image && Storage::disk('public')->exists($agenda->image)) {
            Storage::disk('public')->delete($agenda->image);
        }

        $agenda->delete();
        Cache::forget('api.agenda');

        return response()->json(['message' => 'Agenda berhasil dihapus.']);
    }
}
