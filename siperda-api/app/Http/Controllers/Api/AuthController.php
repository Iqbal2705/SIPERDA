<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'nip' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:3'
        ]);

        $user = User::create([
            'name' => $request->name,
            'nip' => $request->nip,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'pelapor'
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil',
            'user' => $user
        ]);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([
            'nip' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('nip', $request->nip)->first();

        // user tidak ditemukan
        if (!$user) {

            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        // password salah
        if (!Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'Password salah'
            ], 401);
        }

        // login berhasil
        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user
        ]);
    }
}