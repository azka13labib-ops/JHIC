<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\ResponseCache\Facades\ResponseCache;

class Feature extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon',
        'link_text',
        'link_url',
        'sort_order',
        'is_active',
    ];

    protected static function booted()
    {
        static::saved(function ($model) {
            ResponseCache::clear();
        });

        static::deleted(function ($model) {
            ResponseCache::clear();
        });
    }
}
