<?php

namespace App\Repositories;

use App\Contracts\Interfaces\Eloquent\ProductRepositoryInterface;
use App\Models\Product;
use App\Models\RegistrationDocument;
use App\Models\JobApplication;
use App\Models\Inquiry;

class ProductRepository implements ProductRepositoryInterface
{
    public function getPaginated(int $perPage, array $filters): \Illuminate\Contracts\Pagination\LengthAwarePaginator {
        $query = Product::with('category')->where('is_active', true);
        if (isset($filters['category_id'])) $query->where('category_id', $filters['category_id']);
        if (isset($filters['department'])) $query->where('department', $filters['department']);
        if (isset($filters['search'])) $query->where('name', 'like', '%' . $filters['search'] . '%');
        return $query->latest()->paginate($perPage);
    }

    public function findBySlug(string $slug): Product {
        return Product::with('category')->where('slug', $slug)->where('is_active', true)->firstOrFail();
    }

    public function createInquiry(array $data): Inquiry {
        return Inquiry::create($data);
    }
}