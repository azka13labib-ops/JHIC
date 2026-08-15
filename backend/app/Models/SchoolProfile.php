<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    protected $fillable = [
        'name',
        'description',
        'vision',
        'mission',
        'principal_name',
        'principal_message',
        'email',
        'phone',
        'address',
    ];
}
