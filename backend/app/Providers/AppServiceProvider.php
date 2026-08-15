<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Spatie\ResponseCache\Facades\ResponseCache;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Auto invalidate full response cache & application cache whenever any content model changes
        $models = [
            \App\Models\Agenda::class,
            \App\Models\News::class,
            \App\Models\Article::class,
            \App\Models\Achievement::class,
            \App\Models\Gallery::class,
            \App\Models\StudentWork::class,
            \App\Models\Opinion::class,
            \App\Models\Product::class,
            \App\Models\Vacancy::class,
            \App\Models\Partner::class,
            \App\Models\Alumni::class,
            \App\Models\Announcement::class,
            \App\Models\Feature::class,
            \App\Models\SchoolProfile::class,
            \App\Models\QuickLink::class,
            \App\Models\Blog::class,
            \App\Models\Guestbook::class,
        ];

        foreach ($models as $modelClass) {
            $modelClass::saved(function () {
                try {
                    ResponseCache::clear();
                } catch (\Throwable $e) {}
                Cache::flush();
            });

            $modelClass::deleted(function () {
                try {
                    ResponseCache::clear();
                } catch (\Throwable $e) {}
                Cache::flush();
            });
        }
    }
}
