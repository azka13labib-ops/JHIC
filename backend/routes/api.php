<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LandingPageController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PpdbController;
use Spatie\ResponseCache\Middlewares\CacheResponse;

// Global Rate Limiting untuk proteksi API SMA PGRI 1 Lumajang
Route::middleware(['throttle:100,1'])->group(function () {

    // Cached Public API Routes
    Route::middleware([CacheResponse::class])->group(function () {
        // Landing Page & School Info
        Route::get('/landing', [LandingPageController::class, 'landing']);
        Route::get('/school-info', [LandingPageController::class, 'schoolInfo']);
        Route::get('/features', [LandingPageController::class, 'features']);
        Route::get('/announcements', [LandingPageController::class, 'announcements']);
        Route::get('/news', [LandingPageController::class, 'news']);
        Route::get('/news/{slug}', [LandingPageController::class, 'showNews']);
        
        // Akademik & Kegiatan Siswa
        Route::get('/agendas', [LandingPageController::class, 'agendas']);
        Route::get('/agendas/{slug}', [LandingPageController::class, 'showAgenda']);
        Route::get('/articles', [LandingPageController::class, 'articles']);
        Route::get('/articles/{id}', [LandingPageController::class, 'showArticle']);
        Route::get('/opinions', [LandingPageController::class, 'opinions']);
        Route::get('/opinions/{id}', [LandingPageController::class, 'showOpinion']);
        Route::get('/blogs', [LandingPageController::class, 'blogs']);
        Route::get('/student-works', [LandingPageController::class, 'studentWorks']);
        Route::get('/student-works/{slug}', [LandingPageController::class, 'showStudentWork']);
        Route::get('/galleries', [LandingPageController::class, 'galleries']);
        Route::get('/galleries/{slug}', [LandingPageController::class, 'showGallery']);
        Route::get('/quick-links', [LandingPageController::class, 'quickLinks']);

        // Prestasi, Alumni, Mitra
        Route::get('/achievements', [LandingPageController::class, 'achievements']);
        Route::get('/achievements/{id}', [LandingPageController::class, 'showAchievement']);
        Route::get('/alumnis', [LandingPageController::class, 'alumnis']);
        Route::get('/partners', [LandingPageController::class, 'partners']);
        
        // Buku Tamu Publik
        Route::get('/guestbooks', [LandingPageController::class, 'guestbooks']);
    });
});

// PPDB Info Publik (Tanpa Auth)
Route::get('/ppdb/info', [PpdbController::class, 'info']);

// PPDB Public Status Check (Throttled)
Route::middleware(['throttle:30,1'])->group(function () {
    Route::get('/ppdb/check-status', [PpdbController::class, 'checkStatus']);
});

// PPDB Public / Candidate Submit (Throttled)
Route::middleware(['throttle:20,1'])->group(function () {
    Route::post('/ppdb/submit', [PpdbController::class, 'submit']);
});

// Guestbook Submit (Throttled)
Route::middleware(['throttle:20,1'])->group(function () {
    Route::post('/guestbooks', [LandingPageController::class, 'storeGuestbook']);
});

// Auth Routes (Rate Limited)
Route::middleware(['throttle:15,1'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Protected Routes (Requires Auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // PPDB Document Upload, Status, & Secure Download
    Route::middleware(['throttle:30,1'])->group(function () {
        Route::post('/ppdb/upload-doc', [PpdbController::class, 'uploadDoc']);
        Route::get('/ppdb/status', [PpdbController::class, 'status']);
        Route::get('/ppdb/documents/{id}/download', [PpdbController::class, 'downloadDoc']);
    });

    // ============================================================
    // Admin Routes — requires auth:sanctum AND role=admin
    // ============================================================
    Route::middleware('admin')->prefix('admin')->group(function () {

        // Dashboard Stats
        Route::get('/dashboard/stats', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'stats']);

        // Modul Konten Sekolah
        Route::post('news/{id}/toggle-pin', [\App\Http\Controllers\Api\Admin\NewsController::class, 'togglePin']);
        Route::apiResource('news', \App\Http\Controllers\Api\Admin\NewsController::class);
        Route::apiResource('agendas', \App\Http\Controllers\Api\Admin\AgendaController::class);
        Route::apiResource('articles', \App\Http\Controllers\Api\Admin\ArticleController::class);
        Route::apiResource('opinions', \App\Http\Controllers\Api\Admin\OpinionController::class);
        Route::apiResource('blogs', \App\Http\Controllers\Api\Admin\BlogController::class);
        Route::apiResource('student-works', \App\Http\Controllers\Api\Admin\StudentWorkController::class);
        Route::apiResource('galleries', \App\Http\Controllers\Api\Admin\GalleryController::class);
        Route::apiResource('quick-links', \App\Http\Controllers\Api\Admin\QuickLinkController::class);
        Route::apiResource('guestbooks', \App\Http\Controllers\Api\Admin\GuestbookController::class);
        Route::apiResource('announcements', \App\Http\Controllers\Api\Admin\AnnouncementController::class);
        Route::apiResource('features', \App\Http\Controllers\Api\Admin\FeatureController::class);
        Route::apiResource('achievements', \App\Http\Controllers\Api\Admin\AchievementController::class);
        Route::apiResource('alumni', \App\Http\Controllers\Api\Admin\AlumniController::class);
        Route::apiResource('partners', \App\Http\Controllers\Api\Admin\PartnerController::class);

        // Profil Sekolah
        Route::get('/school-profile', [\App\Http\Controllers\Api\Admin\SchoolProfileController::class, 'show']);
        Route::put('/school-profile', [\App\Http\Controllers\Api\Admin\SchoolProfileController::class, 'update']);

        // PPDB — Pendaftaran & Pengaturan Jadwal
        Route::get('/ppdb-settings', [\App\Http\Controllers\Api\Admin\PpdbSettingsController::class, 'getSettings']);
        Route::post('/ppdb-settings', [\App\Http\Controllers\Api\Admin\PpdbSettingsController::class, 'updateSettings']);
        Route::post('/ppdb-settings/toggle', [\App\Http\Controllers\Api\Admin\PpdbSettingsController::class, 'toggleStatus']);
        Route::get('/registrations', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'index']);
        Route::get('/registrations/export', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'exportCsv']);
        Route::get('/registrations/{id}', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'show']);
        Route::patch('/registrations/{id}/status', [\App\Http\Controllers\Api\Admin\RegistrationController::class, 'updateStatus']);
    });
});
