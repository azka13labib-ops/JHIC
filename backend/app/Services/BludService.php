<?php

namespace App\Services;

use App\Contracts\Interfaces\Eloquent\ProductRepositoryInterface;

class BludService
{
    protected $productRepo;

    public function __construct(ProductRepositoryInterface $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function getProducts(array $filters, int $perPage = 10)
    {
        return $this->productRepo->getPaginated($perPage, $filters);
    }

    public function getProduct(string $slug)
    {
        return $this->productRepo->findBySlug($slug);
    }

    public function submitInquiry(array $data)
    {
        return $this->productRepo->createInquiry($data);
    }
}