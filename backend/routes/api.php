<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LandingPageController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\InquiryController;
use Spatie\ResponseCache\Middlewares\CacheResponse;

// Global Rate Limiting untuk proteksi API
Route::middleware(['throttle:100,1'])->group(function () {

    // Cached Public API Routes (Landing Page, BKK, BLUD Catalog)
    Route::middleware([CacheResponse::class])->group(function () {
        // Landing Page API
        Route::get('/school-info', [\App\Http\Controllers\Api\LandingPageController::class, 'schoolInfo']);
        Route::get('/features', [\App\Http\Controllers\Api\LandingPageController::class, 'features']);
        Route::get('/announcements', [\App\Http\Controllers\Api\LandingPageController::class, 'announcements']);
        Route::get('/news', [\App\Http\Controllers\Api\LandingPageController::class, 'news']);
        Route::get('/news/{slug}', [\App\Http\Controllers\Api\LandingPageController::class, 'showNews']);
        
        Route::get('/agendas', [\App\Http\Controllers\Api\LandingPageController::class, 'agendas']);
        Route::get('/agendas/{id}', [\App\Http\Controllers\Api\LandingPageController::class, 'showAgenda']);
        Route::get('/articles', [\App\Http\Controllers\Api\LandingPageController::class, 'articles']);
        Route::get('/articles/{id}', [\App\Http\Controllers\Api\LandingPageController::class, 'showArticle']);
        Route::get('/galleries', [\App\Http\Controllers\Api\LandingPageController::class, 'galleries']);

        Route::get('/achievements', [\App\Http\Controllers\Api\LandingPageController::class, 'achievements']);
        Route::get('/alumnis', [\App\Http\Controllers\Api\LandingPageController::class, 'alumnis']);
        Route::get('/partners', [\App\Http\Controllers\Api\LandingPageController::class, 'partners']);
        
        // BLUD Catalog API
        Route::get('/products', [\App\Http\Controllers\Api\ProductController::class, 'index']);
        Route::get('/products/{slug}', [\App\Http\Controllers\Api\ProductController::class, 'show']);

        // BKK Public Routes
        Route::get('/companies', [\App\Http\Controllers\Api\CompanyController::class, 'index']);
        Route::get('/jobs', [\App\Http\Controllers\Api\JobController::class, 'index']);
        Route::get('/jobs/{id}', [\App\Http\Controllers\Api\JobController::class, 'show']);
    });
});

// PPDB Info publik
Route::get('/ppdb/info', [\App\Http\Controllers\Api\PpdbController::class, 'info']);

// PPDB Submit — tanpa login (guest)
Route::middleware(['throttle:10,60'])->group(function () {
    Route::post('/ppdb/submit', [\App\Http\Controllers\Api\PpdbController::class, 'submit']);
    Route::post('/ppdb/upload-doc', [\App\Http\Controllers\Api\PpdbController::class, 'uploadDoc']);
    Route::get('/ppdb/check-status', [\App\Http\Controllers\Api\PpdbController::class, 'checkStatus']);
});

// BLUD Inquiries (Stricter rate limiting to prevent spam)
Route::middleware(['throttle:5,60'])->group(function () {
    Route::post('/inquiries', [InquiryController::class, 'store']);
});

// Auth Routes
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

// Protected Routes (Requires Auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);

    // BKK Job Apply (rate limit 3 per hari)
    Route::middleware(['throttle:3,1440'])->group(function () {
        Route::post('/jobs/{id}/apply', [\App\Http\Controllers\Api\JobApplicationController::class, 'apply']);
    });

    // ============================================================
    // Admin Routes — memerlukan auth:sanctum (role admin di gate/policy)
    // ============================================================
    Route::prefix('admin')->group(function () {

        // Dashboard Stats
        Route::get('/dashboard/stats', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'stats']);

        // Berita
        Route::apiResource('news', \App\Http\Controllers\Api\Admin\NewsController::class);
        Route::apiResource('galleries', \App\Http\Controllers\Api\Admin\GalleryController::class);
        Route::apiResource('articles', \App\Http\Controllers\Api\Admin\ArticleController::class);
        Route::apiResource('agendas', \App\Http\Controllers\Api\Admin\AgendaController::class);

        // Fitur Landing Page
        Route::apiResource('features', \App\Http\Controllers\Api\Admin\FeatureController::class);

        // Prestasi
        Route::apiResource('achievements', \App\Http\Controllers\Api\Admin\AchievementController::class);

        // Alumni
        Route::apiResource('alumni', \App\Http\Controllers\Api\Admin\AlumniController::class);

        // Mitra / Partner
        Route::apiResource('partners', \App\Http\Controllers\Api\Admin\PartnerController::class);

        // Pengumuman
        Route::apiResource('announcements', \App\Http\Controllers\Api\Admin\AnnouncementController::class);

        // Profil Sekolah
        Route::get('/school-profile', [\App\Http\Controllers\Api\Admin\SchoolProfileController::class, 'show']);
        Route::put('/school-profile', [\App\Http\Controllers\Api\Admin\SchoolProfileController::class, 'update']);

        // PPDB — Pendaftaran
        Route::get('/registrations', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'index']);
        Route::get('/registrations/export', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'exportCsv']);
        Route::get('/registrations/{id}', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'show']);
        Route::patch('/registrations/{id}/status', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'updateStatus']);

        // Produk BLUD
        Route::get('/product-categories', [\App\Http\Controllers\Api\Admin\ProductController::class, 'categories']);
        Route::apiResource('products', \App\Http\Controllers\Api\Admin\ProductController::class);

        // Lowongan BKK
        Route::get('/vacancy-companies', [\App\Http\Controllers\Api\Admin\VacancyController::class, 'companies']);
        Route::apiResource('vacancies', \App\Http\Controllers\Api\Admin\VacancyController::class);

        // Lamaran Kerja
        Route::get('/job-applications', [\App\Http\Controllers\Api\Admin\JobApplicationController::class, 'index']);
        Route::get('/job-applications/{id}', [\App\Http\Controllers\Api\Admin\JobApplicationController::class, 'show']);
        Route::patch('/job-applications/{id}/status', [\App\Http\Controllers\Api\Admin\JobApplicationController::class, 'updateStatus']);
    });
});
