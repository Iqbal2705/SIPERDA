<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LaporanController;


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

// GET USER DARI NIP
Route::get(
    '/user/{nip}',
    [LaporanController::class, 'getUser']
);

// CREATE LAPORAN
Route::post(
    '/laporan',
    [LaporanController::class, 'store']
);

// RIWAYAT LAPORAN
Route::get(
    '/riwayat/{nip}',
    [LaporanController::class, 'riwayat']
);