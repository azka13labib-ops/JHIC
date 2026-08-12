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
