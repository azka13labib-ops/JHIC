<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class FeatureController extends Controller
{
    public function index()
    {
        $features = Feature::orderBy('sort_order')->get();
        return response()->json($features);
    }

    public function store(Request $request)
    {
        $request->validate([
            'icon'        => 'required|string|max:100',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $feature = Feature::create($request->only(['icon', 'title', 'description', 'sort_order', 'is_active']));
        Cache::forget('api.features');

        return response()->json($feature, 201);
    }

    public function show($id)
    {
        return response()->json(Feature::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $feature = Feature::findOrFail($id);
        $request->validate([
            'icon'        => 'required|string|max:100',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'sort_order'  => 'nullable|integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $feature->update($request->only(['icon', 'title', 'description', 'sort_order', 'is_active']));
        Cache::forget('api.features');

        return response()->json($feature);
    }

    public function destroy($id)
    {
        Feature::findOrFail($id)->delete();
        Cache::forget('api.features');
        return response()->json(['message' => 'Fitur berhasil dihapus.']);
    }
}
