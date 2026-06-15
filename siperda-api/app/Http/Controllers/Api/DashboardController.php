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
}