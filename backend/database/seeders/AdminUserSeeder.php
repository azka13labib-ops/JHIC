<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = env('ADMIN_EMAIL', 'admin@smapgri1lmj.sch.id');
        $adminPassword = env('ADMIN_PASSWORD', 'admin123456!');
        $adminName = env('ADMIN_NAME', 'Admin SMA PGRI 1 Lumajang');

        User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'name' => $adminName,
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
            ]
        );

        $this->command->info("Admin user seeded: {$adminEmail}");
    }
}
