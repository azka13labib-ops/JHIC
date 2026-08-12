<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            \App\Contracts\Interfaces\Eloquent\UserRepositoryInterface::class,
            \App\Repositories\UserRepository::class
        );
        $this->app->bind(
            \App\Contracts\Interfaces\Eloquent\RegistrationRepositoryInterface::class,
            \App\Repositories\RegistrationRepository::class
        );
        $this->app->bind(
            \App\Contracts\Interfaces\Eloquent\VacancyRepositoryInterface::class,
            \App\Repositories\VacancyRepository::class
        );
        $this->app->bind(
            \App\Contracts\Interfaces\Eloquent\ProductRepositoryInterface::class,
            \App\Repositories\ProductRepository::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
