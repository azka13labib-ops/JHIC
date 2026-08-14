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
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('agendas');
        Schema::create('agendas', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::dropIfExists('articles');
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author')->nullable();
            $table->longText('content');
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::dropIfExists('guestbooks');
        Schema::create('guestbooks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('institution')->nullable();
            $table->text('message');
            $table->timestamps();
        });

        Schema::dropIfExists('opinions');
        Schema::create('opinions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->longText('content');
            $table->timestamps();
        });

        Schema::dropIfExists('blogs');
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('url');
            $table->timestamps();
        });

        Schema::dropIfExists('quick_links');
        Schema::create('quick_links', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('url');
            $table->timestamps();
        });

        Schema::dropIfExists('galleries');
        Schema::create('galleries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image');
            $table->timestamps();
        });

        Schema::dropIfExists('student_works');
        Schema::create('student_works', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('student_name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::dropIfExists('products');
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::dropIfExists('careers');
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('position');
            $table->string('company');
            $table->text('description')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendas');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('guestbooks');
        Schema::dropIfExists('opinions');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('quick_links');
        Schema::dropIfExists('galleries');
        Schema::dropIfExists('student_works');
        Schema::dropIfExists('products');
        Schema::dropIfExists('careers');
    }
};
