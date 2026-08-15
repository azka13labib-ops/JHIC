<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $adminEmail = env('ADMIN_EMAIL', 'admin@smapgri1lmj.sch.id');
        $adminPassword = env('ADMIN_PASSWORD');

        if (empty($adminPassword) && app()->isLocal()) {
            $adminPassword = 'admin123456!';
        }

        if (!empty($adminPassword)) {
            User::firstOrCreate(
                ['email' => $adminEmail],
                [
                    'name' => env('ADMIN_NAME', 'Admin SMA PGRI 1'),
                    'password' => bcrypt($adminPassword),
                    'role' => 'admin',
                ]
            );
        }
    }
}
