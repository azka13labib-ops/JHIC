<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
        public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'department' => $this->department,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'image_path' => $this->image_path ? asset('storage/' . $this->image_path) : null,
            'is_active' => (bool)$this->is_active,
            'category' => $this->whenLoaded('category', function() {
                return new ProductCategoryResource($this->category);
            }),
        ];
    }
}
