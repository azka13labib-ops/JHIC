<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'user_id',
        'registration_number',
        'full_name',
        'nisn',
        'date_of_birth',
        'gender',
        'address',
        'previous_school',
        'major_choice',
        'status',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function documents()
    {
        return $this->hasMany(RegistrationDocument::class);
    }
}
