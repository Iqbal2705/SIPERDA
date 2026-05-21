<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('laporans', function (Blueprint $table) {

            $table->id();

            // DATA PELAPOR
            $table->string('nip_pelapor');

            $table->string('nama_pelapor');

            $table->string('unit_kerja_pelapor');

            // DATA TERLAPOR
            $table->string('nip_terlapor');

            $table->string('nama_terlapor');

            $table->string('unit_kerja_terlapor');

            // PELANGGARAN
            $table->string('jenis_pelanggaran');

            $table->date('tanggal_pelanggaran');

            $table->text('uraian');

            // FILE BUKTI
            $table->string('bukti')->nullable();

            // STATUS
            $table->string('status')
                  ->default('Diproses');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('laporans');
    }
};