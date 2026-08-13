<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SchoolProfileController extends Controller
{
    public function show()
    {
        $profile = SchoolProfile::first();
        return response()->json($profile);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name'              => 'required|string|max:255',
            'description'       => 'nullable|string',
            'vision'            => 'nullable|string',
            'mission'           => 'nullable|string',
            'principal_name'    => 'nullable|string|max:255',
            'principal_message' => 'nullable|string',
            'email'             => 'nullable|email|max:255',
            'phone'             => 'nullable|string|max:20',
            'address'           => 'nullable|string',
        ]);

        $profile = SchoolProfile::firstOrNew([]);
        $profile->fill($request->only([
            'name', 'description', 'vision', 'mission',
            'principal_name', 'principal_message', 'email', 'phone', 'address',
        ]));
        $profile->save();

        Cache::forget('api.school-info');

        return response()->json(['message' => 'Profil sekolah berhasil diperbarui.', 'data' => $profile]);
    }
}
