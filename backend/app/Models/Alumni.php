<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'name',
        'graduation_year',
        'profession',
        'company',
        'testimony',
        'photo_url',
    ];
}
