import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  FiUser,
  FiUsers,
  FiFileText,
  FiImage,
  FiClipboard,
  FiSave,
} from "react-icons/fi";

function DetailLaporan() {
  const { id } = useParams();

  const [laporan, setLaporan] = useState(null);

  const [status, setStatus] = useState("");

  const [catatan, setCatatan] = useState("");

  const [hasilPemeriksaan, setHasilPemeriksaan] = useState("");

  const [petugasPemeriksa, setPetugasPemeriksa] = useState("");

  const [diprosesOleh, setDiprosesOleh] = useState("");

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/laporan/${id}`,
      );

      setLaporan(response.data);

      setStatus(response.data.status || "");

      setCatatan(response.data.catatan_admin || "");

      setHasilPemeriksaan(response.data.hasil_pemeriksaan || "");

      setPetugasPemeriksa(response.data.petugas_pemeriksa || "");

      setDiprosesOleh(response.data.diproses_oleh || "");
    } catch (error) {
      console.log(error);
    }
  };

  const simpan = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/laporan/${id}`, {
        status,

        hasil_pemeriksaan: hasilPemeriksaan,

        catatan_admin: catatan,

        petugas_pemeriksa: petugasPemeriksa,

        diproses_oleh: diprosesOleh,
      });

      alert("Laporan berhasil diperbarui");

      getDetail();
    } catch (error) {
      console.log(error);

      alert("Gagal menyimpan perubahan");
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
        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiUser className="text-blue-600 text-2xl" />

            <h2 className="text-xl font-bold text-blue-600">Data Pelapor</h2>
          </div>

          <div className="space-y-4">
            <p>
              <strong>NIP :</strong> {laporan.nip_pelapor}
            </p>

            <p>
              <strong>Nama :</strong> {laporan.nama_pelapor}
            </p>

            <p>
              <strong>Unit Kerja :</strong> {laporan.unit_kerja_pelapor}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiUsers className="text-red-600 text-2xl" />

            <h2 className="text-xl font-bold text-red-600">Data Terlapor</h2>
          </div>

          <div className="space-y-4">
            <p>
              <strong>NIP :</strong> {laporan.nip_terlapor}
            </p>

            <p>
              <strong>Nama :</strong> {laporan.nama_terlapor}
            </p>

            <p>
              <strong>Unit Kerja :</strong> {laporan.unit_kerja_terlapor}
            </p>
          </div>
        </div>
      </div>

      {/* INFORMASI */}
      <div className="bg-white rounded-3xl border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FiFileText className="text-orange-500 text-2xl" />

          <h2 className="text-xl font-bold">Informasi Pelanggaran</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">Jenis Pelanggaran</p>

            <p className="font-semibold mt-2">{laporan.jenis_pelanggaran}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Tanggal Pelanggaran</p>

            <p className="font-semibold mt-2">{laporan.tanggal_pelanggaran}</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-slate-500 mb-2">Uraian Pelanggaran</p>

          <div className="bg-slate-50 rounded-2xl p-5 leading-8">
            {laporan.uraian}
          </div>
        </div>
      </div>

      {/* BUKTI */}
      {laporan.bukti && (
        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FiImage className="text-green-600 text-2xl" />

            <h2 className="text-xl font-bold">Bukti Pelanggaran</h2>
          </div>

          <img
            src={`http://127.0.0.1:8000/storage/${laporan.bukti}`}
            alt="Bukti"
            className="w-full max-h-[600px] object-contain rounded-2xl border"
          />
        </div>
      )}

      {/* TINDAK LANJUT */}
      <div className="bg-white rounded-3xl border p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FiClipboard className="text-blue-600 text-2xl" />

          <h2 className="text-2xl font-bold">Tindak Lanjut Admin</h2>
        </div>

        <div>
          <label className="font-medium">Status Laporan</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-2 border rounded-2xl p-4"
          >
            <option value="Menunggu">Menunggu</option>

            <option value="Diproses">Diproses</option>

            <option value="Selesai">Selesai</option>

            <option value="Ditolak">Ditolak</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="font-medium">Catatan Admin</label>

          <textarea
            rows="4"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full mt-2 border rounded-2xl p-4"
          />
        </div>

        <div className="mt-6">
          <label className="font-medium">Hasil Pemeriksaan</label>

          <textarea
            rows="5"
            value={hasilPemeriksaan}
            onChange={(e) => setHasilPemeriksaan(e.target.value)}
            className="w-full mt-2 border rounded-2xl p-4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="font-medium">Petugas Pemeriksa</label>

            <input
              type="text"
              value={petugasPemeriksa}
              onChange={(e) => setPetugasPemeriksa(e.target.value)}
              className="w-full mt-2 border rounded-2xl p-4"
            />
          </div>

          <div>
            <label className="font-medium">Diproses Oleh</label>

            <input
              type="text"
              value={diprosesOleh}
              onChange={(e) => setDiprosesOleh(e.target.value)}
              className="w-full mt-2 border rounded-2xl p-4"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={simpan}
            className="
              flex
              items-center
              gap-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-8
              py-4
              rounded-2xl
              font-semibold
            "
          >
            <FiSave />
            Simpan Hasil Pemeriksaan
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailLaporan;
