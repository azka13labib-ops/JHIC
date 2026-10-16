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
        if (Schema::hasTable('articles')) {
            Schema::table('articles', function (Blueprint $table) {
                if (!Schema::hasColumn('articles', 'slug')) {
                    $table->string('slug')->nullable()->unique()->after('title');
                }
                if (!Schema::hasColumn('articles', 'published_at')) {
                    $table->timestamp('published_at')->nullable()->after('content');
                }
            });
        }

        if (Schema::hasTable('opinions')) {
            Schema::table('opinions', function (Blueprint $table) {
                if (!Schema::hasColumn('opinions', 'slug')) {
                    $table->string('slug')->nullable()->unique()->after('title');
                }
                if (!Schema::hasColumn('opinions', 'image')) {
                    $table->string('image')->nullable()->after('author');
                }
                if (!Schema::hasColumn('opinions', 'published_at')) {
                    $table->timestamp('published_at')->nullable()->after('content');
                }
            });
        }

        if (Schema::hasTable('products')) {
            Schema::table('products', function (Blueprint $table) {
                if (!Schema::hasColumn('products', 'slug')) {
                    $table->string('slug')->nullable()->unique()->after('name');
                }
                if (!Schema::hasColumn('products', 'department')) {
                    $table->string('department')->nullable()->after('slug');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('articles')) {
            Schema::table('articles', function (Blueprint $table) {
                if (Schema::hasColumn('articles', 'slug')) $table->dropColumn('slug');
                if (Schema::hasColumn('articles', 'published_at')) $table->dropColumn('published_at');
            });
        }

        if (Schema::hasTable('opinions')) {
            Schema::table('opinions', function (Blueprint $table) {
                if (Schema::hasColumn('opinions', 'slug')) $table->dropColumn('slug');
                if (Schema::hasColumn('opinions', 'image')) $table->dropColumn('image');
                if (Schema::hasColumn('opinions', 'published_at')) $table->dropColumn('published_at');
            });
        }

        if (Schema::hasTable('products')) {
            Schema::table('products', function (Blueprint $table) {
                if (Schema::hasColumn('products', 'slug')) $table->dropColumn('slug');
                if (Schema::hasColumn('products', 'department')) $table->dropColumn('department');
            });
        }
    }
};
