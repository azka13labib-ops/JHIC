<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendPpdbNotification implements ShouldQueue
{
    use Queueable;

    public $registrationData;

    /**
     * Create a new job instance.
     */
    public function __construct($registrationData)
    {
        $this->registrationData = $registrationData;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Simulate sending email by logging
        Log::info('PPDB Notification sent asynchronously to user: ' . $this->registrationData['user_id']);
        Log::info('Registration Number: ' . $this->registrationData['registration_number']);
    }
}
