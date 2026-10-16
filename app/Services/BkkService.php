<?php

namespace App\Services;

use App\Contracts\Interfaces\Eloquent\VacancyRepositoryInterface;

class BkkService
{
    protected $vacancyRepo;

    public function __construct(VacancyRepositoryInterface $vacancyRepo)
    {
        $this->vacancyRepo = $vacancyRepo;
    }

    public function getVacancies(array $filters, int $perPage = 10)
    {
        $jobs = $this->vacancyRepo->getPaginated($perPage, $filters);
        
        $jobs->getCollection()->transform(function ($job) {
            if ($job->company && $job->company->logo_path) {
                $job->company->logo_path = asset('storage/' . $job->company->logo_path);
            }
            return $job;
        });

        return $jobs;
    }

    public function getVacancy(int $id)
    {
        $job = $this->vacancyRepo->findById($id);
        if ($job->company && $job->company->logo_path) {
            $job->company->logo_path = asset('storage/' . $job->company->logo_path);
        }
        return $job;
    }

    public function applyJob(int $vacancyId, array $data, $user, $file)
    {
        $vacancy = $this->vacancyRepo->findById($vacancyId);
        
        if (!$vacancy->is_active) {
            throw new \Exception('Lowongan ini sudah ditutup.');
        }

        $path = $file->store('job_applications/cv', 'local');

        return $this->vacancyRepo->createApplication([
            'vacancy_id' => $vacancy->id,
            'user_id' => $user->id,
            'cv_path' => $path,
            'cover_letter' => $data['cover_letter'] ?? null,
            'status' => 'pending'
        ]);
    }
}