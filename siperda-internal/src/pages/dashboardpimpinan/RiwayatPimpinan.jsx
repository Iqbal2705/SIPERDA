import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function RiwayatPimpinan() {
  const [laporan, setLaporan] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRiwayat();
  }, []);

  const getRiwayat = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dashboard-admin/riwayat",
        {
          params: {
            nip: search,
          },
        },
      );

      setLaporan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBadge = (status) => {
    if (status === "Selesai") {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
          <FiCheckCircle />
          Selesai
        </span>
      );
    }

    if (status === "Ditolak") {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
          <FiXCircle />
          Ditolak
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
        <FiClock />
        Diproses
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Riwayat Laporan</h1>

        <p className="text-slate-500 mt-2">
          Arsip laporan yang telah selesai atau ditolak oleh admin.
        </p>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />

            <input
              type="text"
              placeholder="Cari NIP Pelapor / Terlapor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-12
                pr-4
                rounded-2xl
                border
                border-slate-200
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <button
            onClick={getRiwayat}
            className="
              h-14
              px-8
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition
            "
          >
            Cari Data
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">Arsip Laporan</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-5 text-left">ID</th>
                <th className="p-5 text-left">Pelapor</th>
                <th className="p-5 text-left">Terlapor</th>
                <th className="p-5 text-left">Jenis Pelanggaran</th>
                <th className="p-5 text-left">Tanggal</th>
                <th className="p-5 text-left">Status</th>
                <th className="p-5 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {laporan.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-5 font-semibold">#{item.id}</td>

                  <td className="p-5">{item.nama_pelapor}</td>

                  <td className="p-5">{item.nama_terlapor}</td>

                  <td className="p-5">{item.jenis_pelanggaran}</td>

                  <td className="p-5">{item.tanggal_pelanggaran}</td>

                  <td className="p-5">{getBadge(item.status)}</td>

                  <td className="p-5 text-center">
                    <Link
                      to={`/dashboard-pimpinan/detail/${item.id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        transition
                      "
                    >
                      <FiEye />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {laporan.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            Tidak ada data riwayat laporan.
          </div>
        )}
      </div>
    </div>
  );
}

export default RiwayatPimpinan;
