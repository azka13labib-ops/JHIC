<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    public function vacancies()
    {
        return $this->hasMany(Vacancy::class);
    }
}
