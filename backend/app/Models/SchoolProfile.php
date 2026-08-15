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
        'is_ppdb_open',
        'ppdb_academic_year',
        'ppdb_start_date',
        'ppdb_end_date',
        'ppdb_announcement_date',
        'ppdb_closed_message',
    ];

    protected $casts = [
        'is_ppdb_open' => 'boolean',
        'ppdb_start_date' => 'date',
        'ppdb_end_date' => 'date',
        'ppdb_announcement_date' => 'date',
    ];
}
