<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LandingPageController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\InquiryController;

Route::middleware(['throttle:100,1'])->group(function () {
    Route::get('/school-info', [LandingPageController::class, 'schoolInfo']);
    Route::get('/news', [LandingPageController::class, 'news']);
    Route::get('/achievements', [LandingPageController::class, 'achievements']);
    Route::get('/alumnis', [LandingPageController::class, 'alumnis']);
    Route::get('/partners', [LandingPageController::class, 'partners']);
    
    // BLUD Products
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
});

// BLUD Inquiries (Stricter rate limiting to prevent spam)
Route::middleware(['throttle:5,60'])->group(function () {
    Route::post('/inquiries', [InquiryController::class, 'store']);
});

// Auth Routes
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);

// BKK Public Routes
Route::get('/companies', [\App\Http\Controllers\Api\CompanyController::class, 'index']);
Route::get('/jobs', [\App\Http\Controllers\Api\JobController::class, 'index']);
Route::get('/jobs/{id}', [\App\Http\Controllers\Api\JobController::class, 'show']);

// Protected Routes (Requires Auth)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    
    // PPDB Routes
    Route::post('/ppdb/submit', [\App\Http\Controllers\Api\PpdbController::class, 'submit']);
    Route::post('/ppdb/upload-doc', [\App\Http\Controllers\Api\PpdbController::class, 'uploadDoc']);
    Route::get('/ppdb/status', [\App\Http\Controllers\Api\PpdbController::class, 'status']);
    
    // BKK Job Apply
    Route::post('/jobs/{id}/apply', [\App\Http\Controllers\Api\JobApplicationController::class, 'apply']);
});
