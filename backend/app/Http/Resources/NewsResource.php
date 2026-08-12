<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'image_path' => $this->image_path ? asset('storage/' . $this->image_path) : null,
            'author' => $this->whenLoaded('author', function() {
                return ['name' => $this->author->name];
            }),
            'published_at' => $this->published_at,
        ];
    }
}
