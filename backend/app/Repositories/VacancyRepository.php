<?php

namespace App\Repositories;

use App\Contracts\Interfaces\Eloquent\VacancyRepositoryInterface;
use App\Models\Vacancy;
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

class VacancyRepository implements VacancyRepositoryInterface
{
    public function getPaginated(int $perPage, array $filters): \Illuminate\Contracts\Pagination\LengthAwarePaginator {
        $query = Vacancy::with('company')->where('is_active', true);
        if (isset($filters['type'])) $query->where('type', $filters['type']);
        if (isset($filters['location'])) $query->where('location', 'like', '%' . $filters['location'] . '%');
        return $query->latest()->paginate($perPage);
    }

    public function findById(int $id): Vacancy {
        return Vacancy::with('company')->findOrFail($id);
    }

    public function createApplication(array $data): JobApplication {
        return JobApplication::create($data);
    }
}