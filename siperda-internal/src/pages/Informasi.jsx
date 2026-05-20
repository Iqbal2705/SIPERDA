function Informasi() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 px-6 md:px-20 pb-16">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-800">Informasi Sistem</h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          SIPERDA-INTERNAL merupakan sistem pelaporan pelanggaran disiplin
          pegawai internal Inspektorat yang dirancang untuk meningkatkan
          transparansi, akuntabilitas, dan pengawasan internal.
        </p>
      </div>

      {/* CARD FITUR */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Pelaporan Cepat",
            desc: "Pegawai dapat membuat laporan secara online dengan mudah dan aman.",
          },
          {
            title: "Riwayat Pelaporan",
            desc: "Seluruh laporan dapat dipantau melalui riwayat pelaporan.",
          },
          {
            title: "Dashboard Monitoring",
            desc: "Pimpinan dan staf inspektorat dapat memantau statistik laporan.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <span className="text-2xl">📌</span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h2>

            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ALUR */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Alur Pelaporan
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Isi Form Laporan",
            "Verifikasi Inspektorat",
            "Proses Tindak Lanjut",
            "Laporan Selesai",
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>

              <p className="font-medium text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Informasi;
