<?php

namespace App\Repositories;

use App\Contracts\Interfaces\Eloquent\UserRepositoryInterface;
use App\Models\User;
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

class UserRepository implements UserRepositoryInterface
{
    public function findByEmail(string $email): ?User {
        return User::where('email', $email)->first();
    }

    public function create(array $data): User {
        return User::create($data);
    }
}