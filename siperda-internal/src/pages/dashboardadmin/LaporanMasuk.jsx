import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FiSearch, FiEye, FiFileText } from "react-icons/fi";

function LaporanMasuk() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/laporan-masuk",
      );

      setLaporan(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLaporan = laporan.filter((item) =>
    (
      item.nip_pelapor +
      item.nama_pelapor +
      item.nama_terlapor +
      item.jenis_pelanggaran
    )
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Menunggu":
        return "bg-yellow-100 text-yellow-700";

      case "Diproses":
        return "bg-purple-100 text-purple-700";

      case "Selesai":
        return "bg-green-100 text-green-700";

      case "Ditolak":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Laporan Masuk</h1>

        <p className="text-slate-500 mt-2">
          Seluruh laporan yang masuk dan menunggu tindak lanjut admin.
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <div className="relative max-w-2xl">
          <FiSearch
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Cari NIP, Nama Pelapor, Nama Terlapor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-slate-200
              pl-12
              pr-4
              outline-none
              focus:border-blue-500
            "
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Daftar Laporan</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : filteredLaporan.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <FiFileText size={60} className="text-slate-300" />

            <h3 className="text-xl font-semibold mt-4 text-slate-600">
              Tidak Ada Laporan
            </h3>

            <p className="text-slate-400 mt-2">Data laporan tidak ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left p-5">ID</th>

                  <th className="text-left p-5">NIP Pelapor</th>

                  <th className="text-left p-5">Nama Pelapor</th>

                  <th className="text-left p-5">Nama Terlapor</th>

                  <th className="text-left p-5">Jenis Pelanggaran</th>

                  <th className="text-left p-5">Tanggal</th>

                  <th className="text-left p-5">Status</th>

                  <th className="text-center p-5">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredLaporan.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="p-5 font-medium">#{item.id}</td>

                    <td className="p-5">{item.nip_pelapor}</td>

                    <td className="p-5">{item.nama_pelapor}</td>

                    <td className="p-5">{item.nama_terlapor}</td>

                    <td className="p-5">{item.jenis_pelanggaran}</td>

                    <td className="p-5">{item.tanggal_pelanggaran}</td>

                    <td className="p-5">
                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-medium
                          ${getStatusColor(item.status)}
                        `}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-5 text-center">
                      <Link
                        to={`/dashboard-admin/detail-laporan/${item.id}`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          bg-blue-600
                          text-white
                          hover:bg-blue-700
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
        )}
      </div>
    </div>
  );
}

export default LaporanMasuk;
