<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Feature extends Model
{
    protected $guarded = [];

    protected static function booted()
    {
        static::saved(function ($model) {
            \Spatie\ResponseCache\Facades\ResponseCache::clear();
        });

        static::deleted(function ($model) {
            \Spatie\ResponseCache\Facades\ResponseCache::clear();
        });
    }
}
