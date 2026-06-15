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
    return Laporan::where('nip_pelapor', $nip)
        ->orWhere('nip_terlapor', $nip)
        ->orderBy('created_at', 'desc')
        ->get([
            'id',
            'nip_pelapor',
            'nama_pelapor',
            'nip_terlapor',
            'nama_terlapor',
            'jenis_pelanggaran',
            'tanggal_pelanggaran',
            'uraian',
            'status',

            'hasil_pemeriksaan',
            'catatan_admin',
            'petugas_pemeriksa',
            'diproses_oleh',
            'tanggal_proses',

            'created_at',
            'updated_at'
        ]);
}

    public function laporanMasuk()
    {
        return Laporan::whereIn(
            'status',
            ['Menunggu', 'Diproses']
        )
        ->latest()
        ->get();
    }

    public function show($id)
    {
        return Laporan::findOrFail($id);
    }

    public function updateStatus(Request $request, $id)
    {
        $laporan = Laporan::findOrFail($id);

        $laporan->status = $request->status;

        $laporan->hasil_pemeriksaan =
            $request->hasil_pemeriksaan;

        $laporan->catatan_admin =
            $request->catatan_admin;

        $laporan->petugas_pemeriksa =
            $request->petugas_pemeriksa;

        $laporan->diproses_oleh =
            $request->diproses_oleh;

        $laporan->tanggal_proses =
            now();

        $laporan->save();

        return response()->json([
            'message' => 'Laporan berhasil diperbarui'
        ]);
    }
}