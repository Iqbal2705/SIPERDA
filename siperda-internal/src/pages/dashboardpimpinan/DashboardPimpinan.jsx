import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { FiFileText, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

function DashboardPimpinan() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard-pimpinan",
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const pieData = [
    {
      name: "Diproses",
      value: dashboard.diproses,
    },
    {
      name: "Selesai",
      value: dashboard.selesai,
    },
    {
      name: "Ditolak",
      value: dashboard.ditolak,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Pimpinan
        </h1>

        <p className="text-slate-500 mt-2">
          Monitoring dan evaluasi laporan pegawai
        </p>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-5 gap-6">
        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">Total Laporan</p>

          <h1 className="text-4xl font-bold text-blue-600 mt-2">
            {dashboard.total_laporan}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">Menunggu</p>

          <h1 className="text-4xl font-bold text-yellow-500 mt-2">
            {dashboard.menunggu}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">Diproses</p>

          <h1 className="text-4xl font-bold text-purple-500 mt-2">
            {dashboard.diproses}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">Selesai</p>

          <h1 className="text-4xl font-bold text-green-500 mt-2">
            {dashboard.selesai}
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <p className="text-slate-500">Ditolak</p>

          <h1 className="text-4xl font-bold text-red-500 mt-2">
            {dashboard.ditolak}
          </h1>
        </div>
      </div>

      {/* CHART */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h2 className="font-semibold text-xl mb-5">Trend Laporan Tahunan</h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={dashboard.trend}>
              <XAxis dataKey="bulan" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="laporan"
                stroke="#2563eb"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h2 className="font-semibold text-xl mb-5">Status Laporan</h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={110}>
                <Cell fill="#9333ea" />
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">Laporan Terbaru</h2>

          <div className="space-y-4">
            {dashboard.laporan_terbaru.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-3">
                <div>
                  <h3 className="font-semibold">{item.nama_terlapor}</h3>

                  <p className="text-sm text-slate-500">
                    {item.jenis_pelanggaran}
                  </p>
                </div>

                <span className="text-sm">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-5">Unit Kerja Terbanyak</h2>

          <div className="space-y-4">
            {dashboard.unit_terbanyak.map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-3">
                <span>{item.unit_kerja_terlapor}</span>

                <span className="font-bold text-blue-600">{item.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPimpinan;
