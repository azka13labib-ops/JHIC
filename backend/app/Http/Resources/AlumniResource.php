<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlumniResource extends JsonResource
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
            'graduation_year' => $this->graduation_year,
            'current_job' => $this->current_job,
            'company' => $this->company,
            'testimonial' => $this->testimonial,
            'image_path' => $this->image_path ? asset('storage/' . $this->image_path) : null,
        ];
    }
}
