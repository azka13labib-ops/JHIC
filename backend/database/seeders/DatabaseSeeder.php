<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create or Update Master Admin User
        $adminEmail = env('ADMIN_EMAIL', 'admin@smapgri1lmj.sch.id');
        $adminPassword = env('ADMIN_PASSWORD', 'admin123456!');

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => env('ADMIN_NAME', 'Admin SMA PGRI 1 Lumajang'),
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
            ]
        );

        // 2. Seed School Profile Data
        $this->call([
            SchoolProfileSeeder::class,
        ]);
    }
}
