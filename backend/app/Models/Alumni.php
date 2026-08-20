<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'name',
        'graduation_year',
        'major',
        'current_job',
        'company',
        'testimonial',
        'image_path',
    ];
}
