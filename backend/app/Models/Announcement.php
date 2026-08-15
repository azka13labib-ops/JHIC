<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\ResponseCache\Facades\ResponseCache;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'description',
        'badge_text',
        'button_text',
        'button_url',
        'event_date',
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
