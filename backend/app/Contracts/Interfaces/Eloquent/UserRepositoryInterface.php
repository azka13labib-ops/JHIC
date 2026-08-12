<?php

namespace App\Contracts\Interfaces\Eloquent;

use App\Models\User;
// Use other models if needed
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;
    public function create(array $data): User;
}