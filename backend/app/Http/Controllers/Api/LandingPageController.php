<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AchievementResource;
use App\Http\Resources\AlumniResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\PartnerResource;
use App\Http\Resources\SchoolProfileResource;
use App\Models\Achievement;
use App\Models\Alumni;
use App\Models\Announcement;
use App\Models\Article;
use App\Models\Feature;
use App\Models\Gallery;
use App\Models\Guestbook;
use App\Models\News;
use App\Models\Opinion;
use App\Models\Partner;
use App\Models\QuickLink;
use App\Models\SchoolProfile;
use App\Models\StudentWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class LandingPageController extends Controller
{
    public function landing()
    {
        $data = Cache::remember('api.landing_composite', 86400, function () {
            return [
                'profile'       => SchoolProfile::first(),
                'features'      => Feature::where('is_active', true)->orderBy('sort_order')->get(),
                'announcements' => Announcement::where('is_active', true)->latest()->get(),
                'achievements'  => Achievement::orderByDesc('year')->orderByDesc('id')->limit(6)->get(),
                'partners'      => Partner::latest()->get(),
            ];
        });

        return response()->json(['data' => $data], 200);
    }

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
        $news = News::with('author')
            ->where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();

        return new NewsResource($news);
    }

    public function achievements()
    {
        $data = Cache::remember('api.achievements', 86400, function () {
            return Achievement::orderByDesc('year')->orderByDesc('id')->get();
        });

        return AchievementResource::collection($data);
    }

    public function showAchievement($id)
    {
        $achievement = Achievement::findOrFail($id);
        return new AchievementResource($achievement);
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

    public function showAgenda($slug)
    {
        $agenda = \App\Models\Agenda::where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
        return response()->json(['data' => $agenda], 200);
    }

    public function articles()
    {
        $data = Cache::remember('api.articles', 86400, function () {
            return Article::latest('created_at')->get()->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'title'      => $item->title,
                    'slug'       => $item->slug,
                    'author'     => $item->author,
                    'image'      => $item->image,
                    'content'    => Str::limit(strip_tags($item->content), 200),
                    'created_at' => $item->created_at,
                ];
            });
        });
        return response()->json(['data' => $data], 200);
    }

    public function showArticle($id)
    {
        $article = Article::where('slug', $id)
            ->orWhere('id', $id)
            ->firstOrFail();
        return response()->json(['data' => $article], 200);
    }

    public function galleries()
    {
        $data = Cache::remember('api.galleries', 86400, function () {
            return Gallery::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function showGallery($slug)
    {
        $gallery = Gallery::where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
        return response()->json(['data' => $gallery], 200);
    }

    public function studentWorks()
    {
        $data = Cache::remember('api.student_works', 86400, function () {
            return StudentWork::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function showStudentWork($slug)
    {
        $studentWork = StudentWork::where('slug', $slug)
            ->orWhere('id', $slug)
            ->firstOrFail();
        return response()->json(['data' => $studentWork], 200);
    }

    public function opinions()
    {
        $data = Cache::remember('api.opinions', 86400, function () {
            return Opinion::latest('created_at')->get()->map(function ($item) {
                return [
                    'id'         => $item->id,
                    'title'      => $item->title,
                    'slug'       => $item->slug,
                    'author'     => $item->author,
                    'image'      => $item->image,
                    'content'    => Str::limit(strip_tags($item->content), 200),
                    'created_at' => $item->created_at,
                ];
            });
        });
        return response()->json(['data' => $data], 200);
    }

    public function showOpinion($id)
    {
        $opinion = Opinion::where('slug', $id)
            ->orWhere('id', $id)
            ->firstOrFail();
        return response()->json(['data' => $opinion], 200);
    }

    public function blogs()
    {
        $data = Cache::remember('api.blogs', 86400, function () {
            return \App\Models\Blog::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function quickLinks()
    {
        $data = Cache::remember('api.quick_links', 86400, function () {
            return QuickLink::latest('created_at')->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function guestbooks()
    {
        $data = Cache::remember('api.guestbooks', 60, function () {
            return Guestbook::latest('created_at')->limit(50)->get();
        });
        return response()->json(['data' => $data], 200);
    }

    public function storeGuestbook(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'institution' => 'nullable|string|max:255',
            'message'     => 'required|string|max:2000',
        ]);
        
        $guestbook = Guestbook::create($validated);
        Cache::forget('api.guestbooks');
        return response()->json(['message' => 'Buku tamu berhasil dikirim.', 'data' => $guestbook], 201);
    }
}