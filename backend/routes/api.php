<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LandingPageController;

Route::middleware(['throttle:100,1'])->group(function () {
    Route::get('/school-info', [LandingPageController::class, 'schoolInfo']);
    Route::get('/news', [LandingPageController::class, 'news']);
    Route::get('/achievements', [LandingPageController::class, 'achievements']);
    Route::get('/alumnis', [LandingPageController::class, 'alumnis']);
    Route::get('/partners', [LandingPageController::class, 'partners']);
});
