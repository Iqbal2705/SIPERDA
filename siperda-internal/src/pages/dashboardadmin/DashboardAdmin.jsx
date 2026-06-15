import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiTrendingUp,
} from "react-icons/fi";

function DashboardAdmin() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard-admin",
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Staf Inspektorat
        </h1>

        <p className="text-slate-500 mt-2">
          Monitoring laporan pelanggaran disiplin pegawai internal.
        </p>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-5 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Total Laporan</p>

              <h1 className="text-4xl font-bold mt-2 text-blue-600">
                {dashboard.total_laporan}
              </h1>
            </div>

            <FiFileText className="text-4xl text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Menunggu</p>

              <h1 className="text-4xl font-bold mt-2 text-yellow-500">
                {dashboard.menunggu}
              </h1>
            </div>

            <FiAlertCircle className="text-4xl text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Diproses</p>

              <h1 className="text-4xl font-bold mt-2 text-purple-500">
                {dashboard.diproses}
              </h1>
            </div>

            <FiClock className="text-4xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Selesai</p>

              <h1 className="text-4xl font-bold mt-2 text-green-500">
                {dashboard.selesai}
              </h1>
            </div>

            <FiCheckCircle className="text-4xl text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500">Ditolak</p>

              <h1 className="text-4xl font-bold mt-2 text-red-500">
                {dashboard.ditolak}
              </h1>
            </div>

            <FiXCircle className="text-4xl text-red-500" />
          </div>
        </div>
      </div>

      {/* RINGKASAN */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-600">
            Laporan Hari Ini
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-blue-600">
            {dashboard.laporan_hari_ini}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-600">
            Diproses Hari Ini
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-purple-600">
            {dashboard.diproses_hari_ini}
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-600">
            Selesai Hari Ini
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-green-600">
            {dashboard.selesai_hari_ini}
          </h1>
        </div>
      </div>

      {/* TABEL AKTIVITAS */}
      <div className="bg-white rounded-3xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Aktivitas Laporan Terbaru</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b text-slate-500">
                <th className="p-5">ID</th>
                <th className="p-5">Pelapor</th>
                <th className="p-5">Terlapor</th>
                <th className="p-5">Jenis Pelanggaran</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.laporan_terbaru.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-5">{item.id}</td>

                  <td className="p-5">{item.nama_pelapor}</td>

                  <td className="p-5">{item.nama_terlapor}</td>

                  <td className="p-5">{item.jenis_pelanggaran}</td>

                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Diproses"
                            ? "bg-purple-100 text-purple-600"
                            : item.status === "Ditolak"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRIORITAS */}
      <div className="bg-white rounded-3xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Laporan Prioritas</h2>

        {dashboard.prioritas.length > 0 ? (
          <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl p-5">
            <div>
              <h3 className="font-semibold text-red-600 text-lg">
                {dashboard.prioritas[0].jenis_pelanggaran}
              </h3>

              <p className="text-slate-500 text-sm mt-1">
                Dilaporkan oleh {dashboard.prioritas[0].nama_pelapor}
              </p>

              <p className="text-slate-500 text-sm">
                {dashboard.prioritas[0].tanggal_pelanggaran}
              </p>
            </div>

            <button className="px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700">
              Tinjau Laporan
            </button>
          </div>
        ) : (
          <div className="text-slate-500">Tidak ada laporan prioritas.</div>
        )}
      </div>

      {/* INFO */}
      <div className="bg-white rounded-3xl shadow-sm border p-6">
        <div className="flex items-center gap-3 text-green-600">
          <FiTrendingUp size={22} />

          <span className="font-medium">
            Sistem berjalan normal dan terhubung ke database.
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
