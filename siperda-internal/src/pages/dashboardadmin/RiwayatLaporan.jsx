import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { Link } from "react-router-dom";

function RiwayatLaporan() {
  const [laporan, setLaporan] = useState([]);

  const [nip, setNip] = useState("");

  useEffect(() => {
    getRiwayat();
  }, []);

  const getRiwayat = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dashboard-admin/riwayat?nip=${nip}`
      );

      setLaporan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Riwayat Laporan
        </h1>

        <p className="text-slate-500 mt-2">
          Seluruh laporan yang telah selesai diproses.
        </p>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border p-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Cari NIP..."
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full border rounded-2xl pl-12 p-4"
            />
          </div>

          <button
            onClick={getRiwayat}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              rounded-2xl
            "
          >
            Cari
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Arsip Laporan
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-5 text-left">ID</th>
              <th className="p-5 text-left">Pelapor</th>
              <th className="p-5 text-left">Terlapor</th>
              <th className="p-5 text-left">Jenis</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {laporan.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-5">
                  #{item.id}
                </td>

                <td>{item.nama_pelapor}</td>

                <td>{item.nama_terlapor}</td>

                <td>{item.jenis_pelanggaran}</td>

                <td>
                  {item.status === "Selesai" ? (
                    <span className="flex items-center gap-2 text-green-600">
                      <FiCheckCircle />
                      Selesai
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-600">
                      <FiXCircle />
                      Ditolak
                    </span>
                  )}
                </td>

                <td className="text-center">
                  <Link
                    to={`/dashboard-admin/detail-laporan/${item.id}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
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

        {laporan.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            Tidak ada data.
          </div>
        )}
      </div>
    </div>
  );
}

export default RiwayatLaporan;