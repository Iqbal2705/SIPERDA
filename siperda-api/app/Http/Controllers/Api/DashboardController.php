<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Laporan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        return response()->json([

            'total_laporan' =>
                Laporan::count(),

            'menunggu' =>
                Laporan::where('status', 'Menunggu')->count(),

            'diproses' =>
                Laporan::where('status', 'Diproses')->count(),

            'selesai' =>
                Laporan::where('status', 'Selesai')->count(),

            'ditolak' =>
                Laporan::where('status', 'Ditolak')->count(),

            'laporan_hari_ini' =>
                Laporan::whereDate(
                    'created_at',
                    Carbon::today()
                )->count(),

            'diproses_hari_ini' =>
                Laporan::where('status', 'Diproses')
                    ->whereDate(
                        'updated_at',
                        Carbon::today()
                    )->count(),

            'selesai_hari_ini' =>
                Laporan::where('status', 'Selesai')
                    ->whereDate(
                        'updated_at',
                        Carbon::today()
                    )->count(),

            'laporan_terbaru' =>
                Laporan::latest()
                    ->take(10)
                    ->get(),

            'prioritas' =>
                Laporan::where('status', 'Menunggu')
                    ->oldest()
                    ->take(5)
                    ->get(),
        ]);
    }

    public function riwayat(Request $request)
    {
        $query = Laporan::query();

        $query->whereIn('status', [
            'Selesai',
            'Ditolak'
        ]);

        if ($request->nip) {
            $query->where(function ($q) use ($request) {
                $q->where('nip_pelapor', 'like', "%{$request->nip}%")
                ->orWhere('nip_terlapor', 'like', "%{$request->nip}%");
            });
        }

        return response()->json(
            $query
                ->latest()
                ->paginate(10)
        );
    }

    public function pimpinan()
    {
        $trend = [];

        for ($i = 1; $i <= 12; $i++) {

            $trend[] = [
                'bulan' => date('M', mktime(0, 0, 0, $i, 1)),
                'laporan' => Laporan::whereMonth(
                    'created_at',
                    $i
                )->count()
            ];
        }

        return response()->json([

            'total_laporan' =>
                Laporan::count(),

            'menunggu' =>
                Laporan::where('status', 'Menunggu')->count(),

            'diproses' =>
                Laporan::where('status', 'Diproses')->count(),

            'selesai' =>
                Laporan::where('status', 'Selesai')->count(),

            'ditolak' =>
                Laporan::where('status', 'Ditolak')->count(),

            'trend' => $trend,

            'laporan_terbaru' =>
                Laporan::latest()
                ->take(5)
                ->get(),

            'unit_terbanyak' =>
                Laporan::selectRaw(
                    'unit_kerja_terlapor, count(*) as total'
                )
                ->groupBy('unit_kerja_terlapor')
                ->orderByDesc('total')
                ->take(5)
                ->get()
        ]);
    }

    public function ringkasanLaporan(Request $request)
    {
        $query = Laporan::query();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nip_pelapor', 'like', "%{$request->search}%")
                ->orWhere('nama_pelapor', 'like', "%{$request->search}%")
                ->orWhere('nip_terlapor', 'like', "%{$request->search}%")
                ->orWhere('nama_terlapor', 'like', "%{$request->search}%");
            });
        }

        return response()->json(
            $query->latest()->get()
        );
    }

    public function riwayatPimpinan(Request $request)
    {
        $query = Laporan::whereIn('status', [
            'Selesai',
            'Ditolak'
        ]);

        if ($request->search) {

            $query->where(function ($q) use ($request) {

                $q->where(
                    'nama_pelapor',
                    'like',
                    "%{$request->search}%"
                )

                ->orWhere(
                    'nama_terlapor',
                    'like',
                    "%{$request->search}%"
                )

                ->orWhere(
                    'nip_pelapor',
                    'like',
                    "%{$request->search}%"
                )

                ->orWhere(
                    'nip_terlapor',
                    'like',
                    "%{$request->search}%"
                );
            });
        }

        if ($request->status) {

            $query->where(
                'status',
                $request->status
            );
        }

        return response()->json(
            $query
                ->latest()
                ->get()
        );
    }

    public function laporanUnitKerja(Request $request)
    {
        $query = Laporan::selectRaw('
            unit_kerja_terlapor,
            COUNT(*) as total,
            SUM(status = "Menunggu") as menunggu,
            SUM(status = "Diproses") as diproses,
            SUM(status = "Selesai") as selesai,
            SUM(status = "Ditolak") as ditolak
        ')
        ->groupBy('unit_kerja_terlapor');

        if ($request->unit) {
            $query->where(
                'unit_kerja_terlapor',
                'like',
                "%{$request->unit}%"
            );
        }

        return response()->json(
            $query->get()
        );
    }

   public function exportData(Request $request)
    {
        $query = Laporan::query();

        if (!$request->nip) {
            return response()->json([
                'message' => 'NIP wajib diisi'
            ], 422);
        }

        $query->where(function ($q) use ($request) {

            $q->where(
                'nip_pelapor',
                $request->nip
            )

            ->orWhere(
                'nip_terlapor',
                $request->nip
            );
        });

        if ($request->unit_kerja) {

            $query->where(
                'unit_kerja_terlapor',
                'like',
                "%{$request->unit_kerja}%"
            );
        }

        if ($request->tanggal) {

            $query->whereDate(
                'tanggal_pelanggaran',
                $request->tanggal
            );
        }

        return response()->json(
            $query
                ->latest()
                ->get()
        );
    }
    }