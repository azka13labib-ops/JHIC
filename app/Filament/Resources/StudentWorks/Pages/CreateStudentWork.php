<?php

namespace App\Filament\Resources\StudentWorks\Pages;

use App\Filament\Resources\StudentWorks\StudentWorkResource;
use Filament\Resources\Pages\CreateRecord;

class CreateStudentWork extends CreateRecord
{
    protected static string $resource = StudentWorkResource::class;
}
