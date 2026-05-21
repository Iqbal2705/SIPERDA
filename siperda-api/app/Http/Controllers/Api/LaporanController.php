<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\User;

use App\Models\Laporan;

class LaporanController extends Controller
{
    // GET USER BERDASARKAN NIP
    public function getUser($nip)
    {
        $user = User::where(
            'nip',
            $nip
        )->first();

        if (!$user) {

            return response()->json([

                'message' => 'NIP tidak ditemukan'
            ], 404);
        }

        return response()->json($user);
    }

    // SIMPAN LAPORAN
    public function store(Request $request)
    {
        $laporan = Laporan::create([

            'nip_pelapor' =>
            $request->nip_pelapor,

            'nama_pelapor' =>
            $request->nama_pelapor,

            'unit_kerja_pelapor' =>
            $request->unit_kerja_pelapor,

            'nip_terlapor' =>
            $request->nip_terlapor,

            'nama_terlapor' =>
            $request->nama_terlapor,

            'unit_kerja_terlapor' =>
            $request->unit_kerja_terlapor,

            'jenis_pelanggaran' =>
            $request->jenis_pelanggaran,

            'tanggal_pelanggaran' =>
            $request->tanggal_pelanggaran,

            'uraian' =>
            $request->uraian,
        ]);

        return response()->json([

            'message' =>
            'Laporan berhasil dikirim',

            'data' => $laporan
        ]);
    }

    // RIWAYAT BERDASARKAN NIP
    public function riwayat($nip)
    {
        $laporan = Laporan::where(
            'nip_pelapor',
            $nip
        )->latest()->get();

        return response()->json($laporan);
    }
}