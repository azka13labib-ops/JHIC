<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\ResponseCache\Facades\ResponseCache;

class News extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'image_path',
        'is_pinned',
        'author_id',
        'published_at',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    protected static function booted()
    {
        static::saving(function ($model) {
            if (empty($model->slug) && !empty($model->title)) {
                $model->slug = Str::slug($model->title);
            }
        });

        static::saved(function ($model) {
            ResponseCache::clear();
        });

        static::deleted(function ($model) {
            ResponseCache::clear();
        });
    }
}
