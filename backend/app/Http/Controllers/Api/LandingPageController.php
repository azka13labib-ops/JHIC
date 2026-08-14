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

use App\Models\Feature;
use App\Models\Announcement;

class LandingPageController extends Controller
{
    public function features()
    {
        $data = Cache::remember('api.features', 86400, function () {
            return Feature::where('is_active', true)->orderBy('sort_order')->get();
        });

        return response()->json(['data' => $data], 200);
    }

    public function announcements()
    {
        $data = Cache::remember('api.announcements', 86400, function () {
            return Announcement::where('is_active', true)->latest()->get();
        });

        return response()->json(['data' => $data], 200);
    }
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
            return News::with('author')->latest('published_at')->get();
        });

        return NewsResource::collection($data);
    }

    public function showNews($slug)
    {
        $news = News::with('author')->where('slug', $slug)->firstOrFail();
        return new NewsResource($news);
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

    public function agendas()
    {
        $data = Cache::remember('api.agendas', 86400, function () {
            return \App\Models\Agenda::latest('date')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function showAgenda($id)
    {
        $agenda = \App\Models\Agenda::findOrFail($id);
        return response()->json(['data' => $agenda], 200);
    }

    public function articles()
    {
        $data = Cache::remember('api.articles', 86400, function () {
            return \App\Models\Article::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function showArticle($id)
    {
        $article = \App\Models\Article::findOrFail($id);
        return response()->json(['data' => $article], 200);
    }

    public function galleries()
    {
        $data = Cache::remember('api.galleries', 86400, function () {
            return \App\Models\Gallery::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

}