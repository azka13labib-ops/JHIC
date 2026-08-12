<?php

namespace App\Contracts\Interfaces\Eloquent;

use App\Models\Vacancy;
// Use other models if needed
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

interface VacancyRepositoryInterface
{
    public function getPaginated(int $perPage, array $filters): \Illuminate\Contracts\Pagination\LengthAwarePaginator;
    public function findById(int $id): Vacancy;
    public function createApplication(array $data): JobApplication;
}