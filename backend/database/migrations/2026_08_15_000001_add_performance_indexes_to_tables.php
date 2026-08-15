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
        if (Schema::hasTable('news') && Schema::hasColumn('news', 'published_at')) {
            Schema::table('news', function (Blueprint $table) {
                $table->index('published_at');
            });
        }

        if (Schema::hasTable('agendas') && Schema::hasColumn('agendas', 'date')) {
            Schema::table('agendas', function (Blueprint $table) {
                $table->index('date');
            });
        }

        if (Schema::hasTable('achievements') && Schema::hasColumn('achievements', 'year')) {
            Schema::table('achievements', function (Blueprint $table) {
                $table->index('year');
            });
        }

        if (Schema::hasTable('alumnis') && Schema::hasColumn('alumnis', 'graduation_year')) {
            Schema::table('alumnis', function (Blueprint $table) {
                $table->index('graduation_year');
            });
        }

        if (Schema::hasTable('job_applications')) {
            Schema::table('job_applications', function (Blueprint $table) {
                if (Schema::hasColumn('job_applications', 'vacancy_id') && Schema::hasColumn('job_applications', 'status')) {
                    $table->index(['vacancy_id', 'status']);
                } elseif (Schema::hasColumn('job_applications', 'job_id') && Schema::hasColumn('job_applications', 'status')) {
                    $table->index(['job_id', 'status']);
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('news') && Schema::hasColumn('news', 'published_at')) {
            Schema::table('news', function (Blueprint $table) {
                $table->dropIndex(['published_at']);
            });
        }

        if (Schema::hasTable('agendas') && Schema::hasColumn('agendas', 'date')) {
            Schema::table('agendas', function (Blueprint $table) {
                $table->dropIndex(['date']);
            });
        }

        if (Schema::hasTable('achievements') && Schema::hasColumn('achievements', 'year')) {
            Schema::table('achievements', function (Blueprint $table) {
                $table->dropIndex(['year']);
            });
        }

        if (Schema::hasTable('alumnis') && Schema::hasColumn('alumnis', 'graduation_year')) {
            Schema::table('alumnis', function (Blueprint $table) {
                $table->dropIndex(['graduation_year']);
            });
        }

        if (Schema::hasTable('job_applications')) {
            Schema::table('job_applications', function (Blueprint $table) {
                if (Schema::hasColumn('job_applications', 'vacancy_id') && Schema::hasColumn('job_applications', 'status')) {
                    $table->dropIndex(['vacancy_id', 'status']);
                } elseif (Schema::hasColumn('job_applications', 'job_id') && Schema::hasColumn('job_applications', 'status')) {
                    $table->dropIndex(['job_id', 'status']);
                }
            });
        }
    }
};
