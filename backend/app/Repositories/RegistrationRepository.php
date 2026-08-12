<?php

namespace App\Repositories;

use App\Contracts\Interfaces\Eloquent\RegistrationRepositoryInterface;
use App\Models\Registration;
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

class RegistrationRepository implements RegistrationRepositoryInterface
{
    public function findByUser(int $userId): ?Registration {
        return Registration::with('documents')->where('user_id', $userId)->first();
    }

    public function create(array $data): Registration {
        return Registration::create($data);
    }

    public function updateOrCreateDocument(int $registrationId, string $type, string $path): RegistrationDocument {
        return RegistrationDocument::updateOrCreate(
            ['registration_id' => $registrationId, 'document_type' => $type],
            ['file_path' => $path]
        );
    }
}