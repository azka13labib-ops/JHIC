<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            $table->boolean('is_ppdb_open')->default(true)->after('address');
            $table->string('ppdb_academic_year')->default('2026/2027')->after('is_ppdb_open');
            $table->date('ppdb_start_date')->nullable()->after('ppdb_academic_year');
            $table->date('ppdb_end_date')->nullable()->after('ppdb_start_date');
            $table->date('ppdb_announcement_date')->nullable()->after('ppdb_end_date');
            $table->text('ppdb_closed_message')->nullable()->after('ppdb_announcement_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'is_ppdb_open',
                'ppdb_academic_year',
                'ppdb_start_date',
                'ppdb_end_date',
                'ppdb_announcement_date',
                'ppdb_closed_message'
            ]);
        });
    }
};
