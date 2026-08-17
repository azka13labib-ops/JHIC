<?php

namespace App\Http\Requests;

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
     * Sanitize inputs before validation to strip any non-digit characters from numeric fields.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'nisn'         => $this->nisn ? preg_replace('/\D/', '', (string) $this->nisn) : null,
            'phone'        => $this->phone ? preg_replace('/\D/', '', (string) $this->phone) : null,
            'parent_phone' => $this->parent_phone ? preg_replace('/\D/', '', (string) $this->parent_phone) : null,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'full_name'       => 'required|string|max:255',
            'nisn'            => ['required', 'string', 'regex:/^[0-9]{10}$/'],
            'date_of_birth'   => 'required|date',
            'gender'          => 'required|in:L,P',
            'address'         => 'required|string',
            'previous_school' => 'required|string|max:255',
            'major_choice'    => 'nullable|string|max:255',
            'email'           => 'nullable|email|max:255|unique:users,email',
            'phone'           => ['nullable', 'string', 'regex:/^[0-9]{9,15}$/'],
            'parent_name'     => 'nullable|string|max:255',
            'parent_phone'    => ['nullable', 'string', 'regex:/^[0-9]{9,15}$/'],
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nisn.required'       => 'NISN wajib diisi.',
            'nisn.regex'          => 'NISN harus tepat berupa 10 digit angka tanpa karakter simbol, huruf, spasi, atau emoji.',
            'phone.regex'         => 'Nomor HP/WhatsApp calon siswa harus berupa 9 sampai 15 digit angka murni.',
            'parent_phone.regex'  => 'Nomor WhatsApp orang tua/wali harus berupa 9 sampai 15 digit angka murni.',
            'gender.in'           => 'Pilihan jenis kelamin tidak valid.',
            'date_of_birth.date'  => 'Format tanggal lahir tidak valid.',
        ];
    }
}
