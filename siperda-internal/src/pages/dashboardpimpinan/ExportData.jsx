import { useState } from "react";
import axios from "axios";

import {
  FiDownload,
  FiFileText,
  FiUser,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

import * as XLSX from "xlsx";

function ExportData() {
  const [nip, setNip] = useState("");

  const [unitKerja, setUnitKerja] = useState("");

  const [tanggal, setTanggal] = useState("");

  const exportExcel = async () => {
    if (!nip) {
      alert("NIP wajib diisi");
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard-pimpinan/export",
        {
          params: {
            nip,
            unit_kerja: unitKerja,
            tanggal,
          },
        },
      );

      const data = response.data.map((item) => ({
        ID: item.id,
        NIP_Pelapor: item.nip_pelapor,
        Nama_Pelapor: item.nama_pelapor,
        NIP_Terlapor: item.nip_terlapor,
        Nama_Terlapor: item.nama_terlapor,
        Unit_Kerja: item.unit_kerja_terlapor,
        Jenis_Pelanggaran: item.jenis_pelanggaran,
        Status: item.status,
        Tanggal_Pelanggaran: item.tanggal_pelanggaran,
        Petugas_Pemeriksa: item.petugas_pemeriksa,
        Hasil_Pemeriksaan: item.hasil_pemeriksaan,
        Catatan_Admin: item.catatan_admin,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");

      XLSX.writeFile(workbook, `laporan-${nip}.xlsx`);
    } catch (error) {
      console.log(error);

      alert("Gagal export data");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Export Data Laporan
        </h1>

        <p className="text-slate-500 mt-2">
          Export laporan berdasarkan NIP pegawai.
        </p>
      </div>

      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* NIP */}
          <div>
            <label className="font-medium text-slate-700">NIP Pegawai *</label>

            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Masukkan NIP"
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  pl-12
                "
              />
            </div>
          </div>

          {/* UNIT KERJA */}
          <div>
            <label className="font-medium text-slate-700">Unit Kerja</label>

            <div className="relative mt-2">
              <FiUsers className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                value={unitKerja}
                onChange={(e) => setUnitKerja(e.target.value)}
                placeholder="Opsional"
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  pl-12
                "
              />
            </div>
          </div>

          {/* TANGGAL */}
          <div>
            <label className="font-medium text-slate-700">Tanggal</label>

            <div className="relative mt-2">
              <FiCalendar className="absolute left-4 top-4 text-slate-400" />

              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  pl-12
                "
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={exportExcel}
            className="
              flex
              items-center
              gap-3
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
            "
          >
            <FiDownload />
            Export Excel
          </button>

          <button
            className="
              flex
              items-center
              gap-3
              bg-red-600
              hover:bg-red-700
              text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
            "
          >
            <FiFileText />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportData;
