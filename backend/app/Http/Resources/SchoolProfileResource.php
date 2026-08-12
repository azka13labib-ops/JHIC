<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolProfileResource extends JsonResource
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
            'name' => $this->name,
            'tagline' => $this->tagline,
            'vision' => $this->vision,
            'mission' => $this->mission,
            'phone' => $this->phone,
            'email' => $this->email,
            'address' => $this->address,
            'headmaster_name' => $this->headmaster_name,
            'headmaster_image' => $this->headmaster_image ? asset('storage/' . $this->headmaster_image) : null,
            'headmaster_message' => $this->headmaster_message,
        ];
    }
}
