<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('school_profiles')->insert([
            'name' => 'SMAS PGRI 1 LUMAJANG',
            'tagline' => 'Terdepan dalam Prestasi dan Budi Pekerti',
            'vision' => 'Menjadi institusi pendidikan yang unggul, berbudaya, dan berwawasan global.',
            'mission' => '1. Menyelenggarakan pembelajaran yang aktif, inovatif, kreatif, efektif, dan menyenangkan.\n2. Mengembangkan potensi peserta didik secara optimal.',
            'phone' => '+6281234567890',
            'email' => 'info@smaspgri1lumajang.sch.id',
            'address' => 'Jl. Pendidikan No. 1, Lumajang, Jawa Timur',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
