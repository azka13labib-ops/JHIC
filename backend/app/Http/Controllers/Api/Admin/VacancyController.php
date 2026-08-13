<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vacancy;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class VacancyController extends Controller
{
    public function index()
    {
        $vacancies = Vacancy::with('company')->latest()->get();
        return response()->json($vacancies);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'company_id'   => 'required|exists:companies,id',
            'type'         => 'required|in:pkl,full_time,part_time',
            'description'  => 'required|string',
            'requirements' => 'required|string',
            'deadline'     => 'nullable|date|after:today',
            'is_active'    => 'boolean',
        ]);

        $vacancy = Vacancy::create([
            'title'        => $request->title,
            'slug'         => Str::slug($request->title) . '-' . uniqid(),
            'company_id'   => $request->company_id,
            'type'         => $request->type,
            'description'  => $request->description,
            'requirements' => $request->requirements,
            'deadline'     => $request->deadline,
            'is_active'    => $request->boolean('is_active', true),
        ]);

        Cache::forget('api.jobs');
        return response()->json($vacancy->load('company'), 201);
    }

    public function show($id)
    {
        return response()->json(Vacancy::with('company')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $vacancy = Vacancy::findOrFail($id);
        $request->validate([
            'title'        => 'required|string|max:255',
            'company_id'   => 'required|exists:companies,id',
            'type'         => 'required|in:pkl,full_time,part_time',
            'description'  => 'required|string',
            'requirements' => 'required|string',
            'deadline'     => 'nullable|date',
            'is_active'    => 'boolean',
        ]);

        $vacancy->update($request->only(['title', 'company_id', 'type', 'description', 'requirements', 'deadline', 'is_active']));
        Cache::forget('api.jobs');

        return response()->json($vacancy->load('company'));
    }

    public function destroy($id)
    {
        Vacancy::findOrFail($id)->delete();
        Cache::forget('api.jobs');
        return response()->json(['message' => 'Lowongan berhasil dihapus.']);
    }

    public function companies()
    {
        return response()->json(Company::orderBy('name')->get());
    }
}
