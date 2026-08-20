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
        $agenda = Agenda::orderByDesc('is_pinned')->orderBy('created_at', 'desc')->get();
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
            'image' => 'nullable|image|max:5120',
            'is_pinned' => 'nullable|boolean',
        ]);

        if ($request->boolean('is_pinned')) {
            $pinnedCount = Agenda::where('is_pinned', true)->count();
            if ($pinnedCount >= 3) {
                return response()->json([
                    'error' => 'Batas Maksimal Tercapai',
                    'message' => 'Anda hanya dapat menyematkan maksimal 3 agenda. Silakan lepas sematan pada agenda lain terlebih dahulu.'
                ], 400);
            }
        }

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
            'is_pinned' => $request->boolean('is_pinned'),
        ]);

        Cache::forget('api.agenda');
        Cache::forget('api.agendas');

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
            'image' => 'nullable|image|max:5120',
            'is_pinned' => 'nullable|boolean',
        ]);

        $isPinning = $request->has('is_pinned') ? $request->boolean('is_pinned') : $agenda->is_pinned;

        if ($isPinning && !$agenda->is_pinned) {
            $pinnedCount = Agenda::where('is_pinned', true)->count();
            if ($pinnedCount >= 3) {
                return response()->json([
                    'error' => 'Batas Maksimal Tercapai',
                    'message' => 'Anda hanya dapat menyematkan maksimal 3 agenda. Silakan lepas sematan pada agenda lain terlebih dahulu.'
                ], 400);
            }
        }

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
            'is_pinned' => $request->has('is_pinned') ? $request->boolean('is_pinned') : $agenda->is_pinned,
        ]);

        Cache::forget('api.agenda');
        Cache::forget('api.agendas');

        return response()->json($agenda);
    }

    /**
     * Toggle pinned status of agenda.
     */
    public function togglePin($id)
    {
        $agenda = Agenda::findOrFail($id);
        
        if (!$agenda->is_pinned) {
            $pinnedCount = Agenda::where('is_pinned', true)->count();
            if ($pinnedCount >= 3) {
                return response()->json([
                    'error' => 'Batas Maksimal Tercapai',
                    'message' => 'Anda hanya dapat menyematkan maksimal 3 agenda. Silakan lepas sematan pada agenda lain terlebih dahulu.'
                ], 400);
            }
        }

        $agenda->is_pinned = !$agenda->is_pinned;
        $agenda->save();

        Cache::forget('api.agenda');
        Cache::forget('api.agendas');

        return response()->json([
            'message'   => $agenda->is_pinned ? 'Agenda berhasil disematkan.' : 'Sematkan agenda telah dilepas.',
            'is_pinned' => $agenda->is_pinned,
            'agenda'    => $agenda,
        ]);
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
        Cache::forget('api.agendas');

        return response()->json(['message' => 'Agenda berhasil dihapus.']);
    }
}
