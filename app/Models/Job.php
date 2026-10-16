<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    /** @use HasFactory<\Database\Factories\JobFactory> */
    use HasFactory;

    protected $table = 'job_vacancies';
    protected $fillable = ['title', 'slug', 'type', 'company', 'location', 'description', 'requirements', 'is_active'];

    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
