<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class StudentWork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'student_name',
        'description',
        'image',
    ];

    protected static function booted()
    {
        static::saving(function ($model) {
            if (empty($model->slug) && !empty($model->title)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}
