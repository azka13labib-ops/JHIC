<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->get();
        return response()->json($products);
    }

    public function categories()
    {
        return response()->json(ProductCategory::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:product_categories,id',
            'department'  => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'nullable|image|max:5120',
            'is_active'   => 'boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'name'        => $request->name,
            'slug'        => Str::slug($request->name) . '-' . uniqid(),
            'category_id' => $request->category_id,
            'department'  => $request->department,
            'description' => $request->description,
            'price'       => $request->price,
            'image_path'  => $imagePath ? Storage::url($imagePath) : null,
            'is_active'   => $request->boolean('is_active', true),
        ]);

        Cache::forget('api.products');
        return response()->json($product->load('category'), 201);
    }

    public function show($id)
    {
        return response()->json(Product::with('category')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:product_categories,id',
            'department'  => 'required|string|max:255',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'image'       => 'nullable|image|max:5120',
            'is_active'   => 'boolean',
        ]);

        $imagePath = $product->image_path;
        if ($request->hasFile('image')) {
            $imagePath = Storage::url($request->file('image')->store('products', 'public'));
        }

        $product->update([
            'name'        => $request->name,
            'category_id' => $request->category_id,
            'department'  => $request->department,
            'description' => $request->description,
            'price'       => $request->price,
            'image_path'  => $imagePath,
            'is_active'   => $request->boolean('is_active', true),
        ]);

        Cache::forget('api.products');
        return response()->json($product->load('category'));
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        Cache::forget('api.products');
        return response()->json(['message' => 'Produk berhasil dihapus.']);
    }
}
