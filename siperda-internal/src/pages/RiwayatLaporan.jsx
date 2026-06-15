import { useState } from "react";
import axios from "axios";

function RiwayatLaporan() {
  const [nip, setNip] = useState("");
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);

  const cariRiwayat = async () => {
    if (!nip) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/riwayat/${nip}`,
      );

      setLaporan(response.data);
    } catch (error) {
      console.log(error);
      alert("Riwayat tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative px-4 py-10"
      style={{
        backgroundImage: "url('/bg-pekanbaru.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* blur effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Riwayat Laporan
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Masukkan NIP"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="flex-1 h-14 rounded-2xl bg-white/10 border border-white/20 px-5 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400"
            />

            <button
              onClick={cariRiwayat}
              className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-[1.02] transition shadow-xl"
            >
              Cari
            </button>
          </div>
        </div>

        {/* DATA */}
        <div className="space-y-6">
          {loading && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white text-lg">
              Loading...
            </div>
          )}

          {!loading && laporan.length === 0 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center text-gray-300">
              Belum ada laporan
            </div>
          )}

          {!loading &&
            laporan.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-[1.01] transition"
              >
                {/* TOP */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-cyan-300">
                      {item.jenis_pelanggaran}
                    </h1>

                    <p className="text-gray-300 mt-2">
                      Tanggal: {item.tanggal_pelanggaran}
                    </p>
                  </div>

                  <div
                    className={`px-5 py-2 rounded-full font-semibold border
                    ${
                      item.status === "Selesai"
                        ? "bg-green-500/20 text-green-300 border-green-400/30"
                        : item.status === "Ditolak"
                          ? "bg-red-500/20 text-red-300 border-red-400/30"
                          : item.status === "Diproses"
                            ? "bg-purple-500/20 text-purple-300 border-purple-400/30"
                            : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* DATA PELAPOR */}
                <div className="grid md:grid-cols-2 gap-5 mb-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm mb-1">Pelapor</p>

                    <h2 className="font-semibold text-lg text-white">
                      {item.nama_pelapor}
                    </h2>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm mb-1">Terlapor</p>

                    <h2 className="font-semibold text-lg text-white">
                      {item.nama_terlapor}
                    </h2>
                  </div>
                </div>

                {/* URAIAN */}
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-5">
                  <p className="text-gray-400 text-sm mb-2">Uraian</p>

                  <p className="leading-relaxed text-gray-200">{item.uraian}</p>
                </div>

                {/* HASIL TINDAK LANJUT ADMIN */}
                {(item.catatan_admin ||
                  item.hasil_pemeriksaan ||
                  item.petugas_pemeriksa ||
                  item.tanggal_proses) && (
                  <div className="bg-cyan-500/10 rounded-2xl p-5 border border-cyan-500/20">
                    <h2 className="text-xl font-bold text-cyan-300 mb-5">
                      Hasil Tindak Lanjut Admin
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">
                          Catatan Admin
                        </p>

                        <p className="text-white">
                          {item.catatan_admin || "-"}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">
                          Hasil Pemeriksaan
                        </p>

                        <p className="text-white">
                          {item.hasil_pemeriksaan || "-"}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">
                          Petugas Pemeriksa
                        </p>

                        <p className="text-white">
                          {item.petugas_pemeriksa || "-"}
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">
                          Tanggal Proses
                        </p>

                        <p className="text-white">
                          {item.tanggal_proses || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RiwayatLaporan;
