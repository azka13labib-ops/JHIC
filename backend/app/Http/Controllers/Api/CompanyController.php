<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::latest()->get()->map(function ($company) {
            if ($company->logo_path) {
                $company->logo_path = asset('storage/' . $company->logo_path);
            }
            return $company;
        });

        return response()->json([
            'data' => $companies
        ]);
    }
}
