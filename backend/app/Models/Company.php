<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'logo_path',
        'location',
        'description',
    ];

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class);
    }
}
