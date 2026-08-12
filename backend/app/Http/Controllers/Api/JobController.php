<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BkkService;

class JobController extends Controller
{
    protected $bkkService;

    public function __construct(BkkService $bkkService)
    {
        $this->bkkService = $bkkService;
    }

    public function index(Request $request)
    {
        $jobs = $this->bkkService->getVacancies($request->all());
        return response()->json($jobs);
    }

    public function show($id)
    {
        $job = $this->bkkService->getVacancy($id);
        return response()->json(['data' => $job]);
    }
}