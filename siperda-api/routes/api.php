<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LaporanController;
use App\Http\Controllers\Api\DashboardController;

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

Route::get('/dashboard-admin', [DashboardController::class, 'admin']);

Route::get(
    '/laporan-masuk',
    [LaporanController::class, 'laporanMasuk']
);

Route::get(
    '/laporan/{id}',
    [LaporanController::class, 'show']
);

Route::put(
    '/laporan/{id}',
    [LaporanController::class, 'updateStatus']
);

Route::get(
    '/dashboard-admin/riwayat',
    [DashboardController::class, 'riwayat']
);

Route::get(
    '/dashboard-pimpinan',
    [DashboardController::class, 'pimpinan']
);

Route::get(
    '/dashboard-pimpinan/ringkasan',
    [DashboardController::class, 'ringkasanLaporan']
);

Route::get(
    '/dashboard-pimpinan/riwayat',
    [DashboardController::class, 'riwayatPimpinan']
);

Route::get(
    '/dashboard-pimpinan/unit-kerja',
    [DashboardController::class, 'laporanUnitKerja']
);

Route::get(
    '/dashboard-pimpinan/export',
    [DashboardController::class, 'exportData']
);