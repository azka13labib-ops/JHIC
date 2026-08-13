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

// BLUD Inquiries (Stricter rate limiting to prevent spam)
Route::middleware(['throttle:5,60'])->group(function () {
    Route::post('/inquiries', [InquiryController::class, 'store']);
});

// Auth Routes
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

// Removed duplicated routes

// Protected Routes (Requires Auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
    // Admin Routes
    Route::prefix('admin')->group(function () {
        Route::apiResource('news', \App\Http\Controllers\Api\Admin\NewsController::class);
    });
    
    // PPDB Routes
    Route::post('/ppdb/submit', [\App\Http\Controllers\Api\PpdbController::class, 'submit']);
    Route::post('/ppdb/upload-doc', [\App\Http\Controllers\Api\PpdbController::class, 'uploadDoc']);
    Route::get('/ppdb/status', [\App\Http\Controllers\Api\PpdbController::class, 'status']);
    
    // BKK Job Apply
    Route::post('/jobs/{id}/apply', [\App\Http\Controllers\Api\JobApplicationController::class, 'apply']);
});
