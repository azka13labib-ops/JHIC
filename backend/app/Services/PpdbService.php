<?php

namespace App\Services;

use App\Contracts\Interfaces\Eloquent\RegistrationRepositoryInterface;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use App\Jobs\SendPpdbNotification;

class PpdbService
{
    protected $registrationRepo;

    public function __construct(RegistrationRepositoryInterface $registrationRepo)
    {
        $this->registrationRepo = $registrationRepo;
    }

    public function submitRegistration(array $data, $user)
    {
        $existing = $this->registrationRepo->findByUser($user->id);
        if ($existing) {
            throw new \Exception('Anda sudah melakukan pendaftaran.');
        }

        $registrationNumber = 'PPDB-' . date('Y') . '-' . strtoupper(Str::random(6));

        $registrationData = [
            'user_id' => $user->id,
            'registration_number' => $registrationNumber,
            'full_name' => $data['full_name'],
            'nisn' => Crypt::encryptString($data['nisn']),
            'date_of_birth' => $data['date_of_birth'],
            'gender' => $data['gender'],
            'address' => $data['address'],
            'previous_school' => $data['previous_school'],
            'major_choice' => $data['major_choice'],
            'status' => 'pending'
        ];

        $registration = $this->registrationRepo->create($registrationData);

        SendPpdbNotification::dispatch($registration->toArray());

        return $registration;
    }

    public function uploadDocument(array $data, $user, $file)
    {
        $registration = $this->registrationRepo->findByUser($user->id);
        if (!$registration) {
            throw new \Exception('Silakan isi formulir PPDB terlebih dahulu.');
        }

        $path = $file->store('ppdb_documents', 'public');

        return $this->registrationRepo->updateOrCreateDocument($registration->id, $data['type'], $path);
    }
    
    public function getStatus($user)
    {
        return $this->registrationRepo->findByUser($user->id);
    }
}