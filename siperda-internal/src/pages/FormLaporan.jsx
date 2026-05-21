import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormLaporan() {
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [manualTerlapor, setManualTerlapor] = useState(false);

  const [form, setForm] = useState({
    nip_pelapor: "",
    nama_pelapor: "",
    unit_kerja_pelapor: "",
    nip_terlapor: "",
    nama_terlapor: "",
    unit_kerja_terlapor: "",
    jenis_pelanggaran: "",
    tanggal_pelanggaran: "",
    uraian: "",
  });

  const inputStyle =
    "w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-300 outline-none focus:border-cyan-400 transition";

  const readOnlyStyle =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300 cursor-not-allowed";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async (nip, type) => {
    if (!nip) return;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${nip}`);

      if (type === "pelapor") {
        setForm((prev) => ({
          ...prev,
          nip_pelapor: nip,
          nama_pelapor: response.data.name,
          unit_kerja_pelapor: response.data.unit_kerja,
        }));
      }

      if (type === "terlapor") {
        setForm((prev) => ({
          ...prev,
          nip_terlapor: nip,
          nama_terlapor: response.data.name,
          unit_kerja_terlapor: response.data.unit_kerja,
        }));
      }
    } catch {
      if (type === "terlapor") {
        alert("NIP tidak ditemukan, silakan isi manual");
        setManualTerlapor(true);
      } else {
        alert("NIP pelapor tidak ditemukan");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingSubmit(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/laporan", form);

      alert("Laporan berhasil dikirim");
      navigate("/riwayat");
    } catch {
      alert("Gagal mengirim laporan");
    } finally {
      setLoadingSubmit(false);
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

      {/* glow effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white">FORM LAPORAN</h1>

          <p className="text-gray-300 mt-2">
            Sistem Pelaporan Pelanggaran Disiplin Pegawai
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* pelapor */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-cyan-300 mb-5">
              Data Pelapor
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="NIP Pelapor"
                  value={form.nip_pelapor}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nip_pelapor: e.target.value,
                    })
                  }
                  onBlur={() => getUser(form.nip_pelapor, "pelapor")}
                  className={inputStyle}
                  required
                />
              </div>

              <input
                type="text"
                value={form.nama_pelapor}
                readOnly
                placeholder="Nama Pelapor"
                className={readOnlyStyle}
              />

              <input
                type="text"
                value={form.unit_kerja_pelapor}
                readOnly
                placeholder="Unit Kerja"
                className={readOnlyStyle}
              />
            </div>
          </div>

          {/* terlapor */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-orange-300">
                Data Terlapor
              </h2>

              <button
                type="button"
                onClick={() => setManualTerlapor(!manualTerlapor)}
                className="text-sm text-cyan-300 hover:text-white transition"
              >
                {manualTerlapor ? "Gunakan Otomatis" : "Isi Manual"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="NIP Terlapor"
                  value={form.nip_terlapor}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nip_terlapor: e.target.value,
                    })
                  }
                  onBlur={() => {
                    if (!manualTerlapor) {
                      getUser(form.nip_terlapor, "terlapor");
                    }
                  }}
                  className={inputStyle}
                  required
                />
              </div>

              <input
                type="text"
                name="nama_terlapor"
                value={form.nama_terlapor}
                onChange={handleChange}
                readOnly={!manualTerlapor}
                placeholder="Nama Terlapor"
                className={manualTerlapor ? inputStyle : readOnlyStyle}
                required
              />

              <input
                type="text"
                name="unit_kerja_terlapor"
                value={form.unit_kerja_terlapor}
                onChange={handleChange}
                readOnly={!manualTerlapor}
                placeholder="Unit Kerja"
                className={manualTerlapor ? inputStyle : readOnlyStyle}
                required
              />
            </div>
          </div>

          {/* detail */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-red-300 mb-5">
              Detail Laporan
            </h2>

            <div className="space-y-4">
              <select
                name="jenis_pelanggaran"
                value={form.jenis_pelanggaran}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="" className="text-black">
                  Pilih Jenis Pelanggaran
                </option>

                <option className="text-black">Pelanggaran Disiplin</option>

                <option className="text-black">Penyalahgunaan Wewenang</option>

                <option className="text-black">Korupsi / Gratifikasi</option>

                <option className="text-black">Penyalahgunaan Jabatan</option>

                <option className="text-black">Ketidakhadiran</option>

                <option className="text-black">Pelanggaran Etika</option>

                <option className="text-black">Lainnya</option>
              </select>

              <input
                type="date"
                name="tanggal_pelanggaran"
                value={form.tanggal_pelanggaran}
                onChange={handleChange}
                className={inputStyle}
                required
              />

              <textarea
                rows="5"
                name="uraian"
                value={form.uraian}
                onChange={handleChange}
                placeholder="Jelaskan kronologi kejadian..."
                className={inputStyle + " resize-none"}
                required
              />
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold hover:scale-[1.01] transition shadow-xl"
          >
            {loadingSubmit ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLaporan;
