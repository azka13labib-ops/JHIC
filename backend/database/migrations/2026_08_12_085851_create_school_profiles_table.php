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
        Schema::create('school_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('tagline')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('headmaster_name')->nullable();
            $table->string('headmaster_image')->nullable();
            $table->text('headmaster_message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};
