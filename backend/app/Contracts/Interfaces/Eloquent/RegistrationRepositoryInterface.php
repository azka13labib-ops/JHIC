<?php

namespace App\Contracts\Interfaces\Eloquent;

use App\Models\Registration;
// Use other models if needed
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

interface RegistrationRepositoryInterface
{
    public function findByUser(int $userId): ?Registration;
    public function create(array $data): Registration;
    public function updateOrCreateDocument(int $registrationId, string $type, string $path): RegistrationDocument;
}