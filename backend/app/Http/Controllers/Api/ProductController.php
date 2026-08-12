<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BludService;

class ProductController extends Controller
{
    protected $bludService;

    public function __construct(BludService $bludService)
    {
        $this->bludService = $bludService;
    }

    public function index(Request $request)
    {
        $products = $this->bludService->getProducts($request->all());
        
        $products->getCollection()->transform(function ($product) {
            if ($product->image_path) {
                $product->image_path = asset('storage/' . $product->image_path);
            }
            return $product;
        });

        return response()->json($products);
    }

    public function show($slug)
    {
        $product = $this->bludService->getProduct($slug);

        if ($product->image_path) {
            $product->image_path = asset('storage/' . $product->image_path);
        }

        return response()->json(['data' => $product]);
    }
}