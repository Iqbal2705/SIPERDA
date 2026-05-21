<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    protected $fillable = [

        'nip_pelapor',

        'nama_pelapor',

        'unit_kerja_pelapor',

        'nip_terlapor',

        'nama_terlapor',

        'unit_kerja_terlapor',

        'jenis_pelanggaran',

        'tanggal_pelanggaran',

        'uraian',

        'bukti',

        'status'
    ];
}