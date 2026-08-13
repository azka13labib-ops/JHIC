<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Requests\AuthLoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(AuthRegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'access_token' => $result['token'],
            'token_type' => 'Bearer',
            'user' => $result['user']
        ], 201);
    }

    public function login(AuthLoginRequest $request)
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'access_token' => $result['token'],
            'token_type' => 'Bearer',
            'user' => $result['user']
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}