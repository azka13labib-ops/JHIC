<?php

namespace App\Contracts\Interfaces\Eloquent;

use App\Models\Product;
// Use other models if needed
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

interface ProductRepositoryInterface
{
    public function getPaginated(int $perPage, array $filters): \Illuminate\Contracts\Pagination\LengthAwarePaginator;
    public function findBySlug(string $slug): Product;
    public function createInquiry(array $data): Inquiry;
}