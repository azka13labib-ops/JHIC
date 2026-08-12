<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePpdbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
        public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'nisn' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:L,P',
            'address' => 'required|string',
            'previous_school' => 'required|string|max:255',
            'major_choice' => 'required|string|max:255',
        ];
    }
}
