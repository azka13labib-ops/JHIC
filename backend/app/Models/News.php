<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $guarded = [];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

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
