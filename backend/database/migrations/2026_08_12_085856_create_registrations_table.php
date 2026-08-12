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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('registration_number')->unique();
            $table->enum('status', ['pending', 'verified', 'accepted', 'rejected'])->default('pending');
            $table->string('full_name');
            $table->string('nisn', 20)->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['L', 'P']);
            $table->text('address');
            $table->string('previous_school');
            $table->string('major_choice');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
