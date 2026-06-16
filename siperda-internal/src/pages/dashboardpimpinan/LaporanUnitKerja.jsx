import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiUsers,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

function LaporanUnitKerja() {
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard-pimpinan/unit-kerja",
        {
          params: {
            unit,
          },
        },
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalLaporan = data.reduce((sum, item) => sum + Number(item.total), 0);

  const totalSelesai = data.reduce(
    (sum, item) => sum + Number(item.selesai),
    0,
  );

  const totalDiproses = data.reduce(
    (sum, item) => sum + Number(item.diproses),
    0,
  );

  const totalDitolak = data.reduce(
    (sum, item) => sum + Number(item.ditolak),
    0,
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Laporan Unit Kerja
        </h1>

        <p className="text-slate-500 mt-2">
          Monitoring laporan berdasarkan unit kerja pegawai.
        </p>
      </div>

      {/* CARD */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Laporan</p>

              <h2 className="text-3xl font-bold mt-2 text-slate-800">
                {totalLaporan}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FiAlertCircle className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Diproses</p>

              <h2 className="text-3xl font-bold mt-2 text-purple-600">
                {totalDiproses}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <FiClock className="text-purple-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Selesai</p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {totalSelesai}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FiCheckCircle className="text-green-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Ditolak</p>

              <h2 className="text-3xl font-bold mt-2 text-red-600">
                {totalDitolak}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <FiXCircle className="text-red-600 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl p-6 border shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Cari Unit Kerja..."
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="
                w-full
                border
                rounded-2xl
                pl-12
                p-4
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <button
            onClick={getData}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              rounded-2xl
              font-semibold
            "
          >
            Cari Data
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border overflow-hidden shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Statistik Unit Kerja</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-5 text-left">Unit Kerja</th>

                <th className="p-5 text-center">Total</th>

                <th className="p-5 text-center">Menunggu</th>

                <th className="p-5 text-center">Diproses</th>

                <th className="p-5 text-center">Selesai</th>

                <th className="p-5 text-center">Ditolak</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-t hover:bg-slate-50">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <FiUsers className="text-blue-600" />

                      <span className="font-medium">
                        {item.unit_kerja_terlapor}
                      </span>
                    </div>
                  </td>

                  <td className="text-center font-semibold">{item.total}</td>

                  <td className="text-center text-yellow-600 font-semibold">
                    {item.menunggu}
                  </td>

                  <td className="text-center text-purple-600 font-semibold">
                    {item.diproses}
                  </td>

                  <td className="text-center text-green-600 font-semibold">
                    {item.selesai}
                  </td>

                  <td className="text-center text-red-600 font-semibold">
                    {item.ditolak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            Tidak ada data unit kerja.
          </div>
        )}
      </div>
    </div>
  );
}

export default LaporanUnitKerja;
