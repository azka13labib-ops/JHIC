<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

use App\Models\SchoolProfile;
use App\Models\News;
use App\Models\Achievement;
use App\Models\Alumni;
use App\Models\Partner;

use App\Http\Resources\SchoolProfileResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\AchievementResource;
use App\Http\Resources\AlumniResource;
use App\Http\Resources\PartnerResource;

class LandingPageController extends Controller
{
    public function schoolInfo()
    {
        $data = Cache::remember('api.school-info', 86400, function () {
            return SchoolProfile::first();
        });

        if (!$data) {
            return response()->json(['data' => null], 200);
        }

        return new SchoolProfileResource($data);
    }

    public function news()
    {
        $data = Cache::remember('api.news', 86400, function () {
            return News::with('author')->latest('published_at')->take(6)->get();
        });

        return NewsResource::collection($data);
    }

    public function achievements()
    {
        $data = Cache::remember('api.achievements', 86400, function () {
            return Achievement::orderByDesc('year')->orderByDesc('id')->get();
        });

        return AchievementResource::collection($data);
    }

    public function alumnis()
    {
        $data = Cache::remember('api.alumnis', 86400, function () {
            return Alumni::orderByDesc('graduation_year')->orderByDesc('id')->get();
        });

        return AlumniResource::collection($data);
    }

    public function partners()
    {
        $data = Cache::remember('api.partners', 86400, function () {
            return Partner::latest()->get();
        });

        return PartnerResource::collection($data);
    }
}
