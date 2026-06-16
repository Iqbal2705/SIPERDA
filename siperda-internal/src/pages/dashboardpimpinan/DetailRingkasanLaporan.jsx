import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FiUser,
  FiUsers,
  FiFileText,
  FiImage,
  FiClipboard,
  FiCheckCircle,
} from "react-icons/fi";

function DetailRingkasanLaporan() {
  const { id } = useParams();

  const [laporan, setLaporan] = useState(null);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/laporan/${id}`,
      );

      setLaporan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!laporan) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Detail Laporan
            </h1>

            <p className="text-slate-500 mt-2">ID Laporan #{laporan.id}</p>
          </div>

          <span
            className={`px-5 py-3 rounded-full font-semibold
            ${
              laporan.status === "Selesai"
                ? "bg-green-100 text-green-600"
                : laporan.status === "Diproses"
                  ? "bg-purple-100 text-purple-600"
                  : laporan.status === "Ditolak"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {laporan.status}
          </span>
        </div>
      </div>

      {/* DATA */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiUser className="text-blue-600 text-2xl" />
            <h2 className="font-bold text-xl">Data Pelapor</h2>
          </div>

          <div className="space-y-3">
            <p>
              <b>NIP :</b> {laporan.nip_pelapor}
            </p>
            <p>
              <b>Nama :</b> {laporan.nama_pelapor}
            </p>
            <p>
              <b>Unit :</b> {laporan.unit_kerja_pelapor}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiUsers className="text-red-600 text-2xl" />
            <h2 className="font-bold text-xl">Data Terlapor</h2>
          </div>

          <div className="space-y-3">
            <p>
              <b>NIP :</b> {laporan.nip_terlapor}
            </p>
            <p>
              <b>Nama :</b> {laporan.nama_terlapor}
            </p>
            <p>
              <b>Unit :</b> {laporan.unit_kerja_terlapor}
            </p>
          </div>
        </div>
      </div>

      {/* PELANGGARAN */}
      <div className="bg-white rounded-3xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiFileText className="text-orange-500 text-2xl" />
          <h2 className="font-bold text-xl">Informasi Pelanggaran</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500">Jenis Pelanggaran</p>

            <p className="font-semibold mt-2">{laporan.jenis_pelanggaran}</p>
          </div>

          <div>
            <p className="text-slate-500">Tanggal Pelanggaran</p>

            <p className="font-semibold mt-2">{laporan.tanggal_pelanggaran}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-slate-500 mb-2">Uraian</p>

          <div className="bg-slate-50 p-5 rounded-2xl">{laporan.uraian}</div>
        </div>
      </div>

      {/* BUKTI */}
      {laporan.bukti && (
        <div className="bg-white rounded-3xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <FiImage className="text-green-600 text-2xl" />
            <h2 className="font-bold text-xl">Bukti Pelanggaran</h2>
          </div>

          <img
            src={`http://127.0.0.1:8000/storage/${laporan.bukti}`}
            alt="bukti"
            className="w-full rounded-2xl border"
          />
        </div>
      )}

      {/* HASIL PEMERIKSAAN */}
      <div className="bg-white rounded-3xl border p-8">
        <div className="flex items-center gap-3 mb-8">
          <FiCheckCircle className="text-green-600 text-2xl" />

          <h2 className="text-2xl font-bold">Hasil Pemeriksaan Inspektorat</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500 mb-2">Hasil Pemeriksaan</p>

            <p>{laporan.hasil_pemeriksaan || "-"}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500 mb-2">Catatan Admin</p>

            <p>{laporan.catatan_admin || "-"}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500 mb-2">Petugas Pemeriksa</p>

            <p>{laporan.petugas_pemeriksa || "-"}</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <p className="text-slate-500 mb-2">Diproses Oleh</p>

            <p>{laporan.diproses_oleh || "-"}</p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-2xl">
          <p className="text-slate-500 mb-2">Tanggal Proses</p>

          <p className="font-semibold">{laporan.tanggal_proses || "-"}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailRingkasanLaporan;
