import { useEffect, useState } from "react";
import axios from "axios";

import { FiSearch, FiEye } from "react-icons/fi";

import { Link } from "react-router-dom";

function RingkasanLaporan() {
  const [laporan, setLaporan] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dashboard-pimpinan/ringkasan`,
        {
          params: {
            search,
            status,
          },
        },
      );

      setLaporan(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Ringkasan Laporan</h1>

        <p className="text-slate-500 mt-2">
          Monitoring seluruh laporan pegawai.
        </p>
      </div>

      <div className="bg-white rounded-3xl border p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Cari NIP atau Nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-2xl pl-12 p-4"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-2xl p-4"
          >
            <option value="">Semua Status</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Ditolak">Ditolak</option>
          </select>

          <button
            onClick={getData}
            className="bg-blue-600 text-white rounded-2xl"
          >
            Cari Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Data Laporan</h2>
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
              <tr key={item.id} className="border-t hover:bg-slate-50">
                <td className="p-5">#{item.id}</td>

                <td>{item.nama_pelapor}</td>

                <td>{item.nama_terlapor}</td>

                <td>{item.jenis_pelanggaran}</td>

                <td>
                  <span
                    className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Diproses"
                          ? "bg-purple-100 text-purple-600"
                          : item.status === "Ditolak"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="text-center">
                  <Link
                    to={`/dashboard-pimpinan/detail/${item.id}`}
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
          <div className="p-10 text-center text-slate-500">Tidak ada data.</div>
        )}
      </div>
    </div>
  );
}

export default RingkasanLaporan;
