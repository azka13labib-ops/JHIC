<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index()
    {
        return response()->json(Partner::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'logo'     => 'nullable|image|max:2048',
            'logo_url' => 'nullable|url|max:500',
            'website'  => 'nullable|url|max:500',
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('partners', 'public');
        }

        $partner = Partner::create([
            'name'     => $request->name,
            'logo_url' => $logoPath ? Storage::url($logoPath) : $request->logo_url,
            'website'  => $request->website,
        ]);
        Cache::forget('api.partners');

        return response()->json($partner, 201);
    }

    public function show($id)
    {
        return response()->json(Partner::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $partner = Partner::findOrFail($id);
        $request->validate([
            'name'     => 'required|string|max:255',
            'logo'     => 'nullable|image|max:2048',
            'logo_url' => 'nullable|url|max:500',
            'website'  => 'nullable|url|max:500',
        ]);

        $logoUrl = $partner->logo_url;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('partners', 'public');
            $logoUrl = Storage::url($logoPath);
        } elseif ($request->logo_url) {
            $logoUrl = $request->logo_url;
        }

        $partner->update([
            'name'     => $request->name,
            'logo_url' => $logoUrl,
            'website'  => $request->website,
        ]);
        Cache::forget('api.partners');

        return response()->json($partner);
    }

    public function destroy($id)
    {
        Partner::findOrFail($id)->delete();
        Cache::forget('api.partners');
        return response()->json(['message' => 'Mitra berhasil dihapus.']);
    }
}
