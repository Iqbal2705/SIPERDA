function Tentang() {
  return (
    <div className="min-h-screen bg-white pt-32 px-6 md:px-20 pb-20">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800">
          Tentang SIPERDA-INTERNAL
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Sistem Informasi Pelaporan Pelanggaran Disiplin Pegawai Internal
          Inspektorat yang dikembangkan untuk mendukung tata kelola pengawasan
          yang transparan, modern, dan terintegrasi.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <img
            src="/logo.png"
            alt="logo"
            className="w-64 mx-auto drop-shadow-xl"
          />
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Visi Sistem</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Menjadi sistem pelaporan internal yang terpercaya, efisien,
            transparan, dan mampu meningkatkan disiplin pegawai melalui
            pengawasan berbasis teknologi informasi.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">Misi Sistem</h2>

          <ul className="space-y-4 text-gray-600">
            <li>✔ Mempermudah proses pelaporan internal</li>
            <li>✔ Meningkatkan efektivitas pengawasan</li>
            <li>✔ Menyediakan monitoring laporan secara real-time</li>
            <li>✔ Mendukung transparansi dan akuntabilitas</li>
          </ul>
        </div>
      </div>

      {/* FOOTER CARD */}
      <div className="mt-20 bg-blue-700 rounded-3xl p-10 text-white text-center shadow-xl">
        <h2 className="text-3xl font-bold mb-4">SIPERDA-INTERNAL</h2>

        <p className="max-w-2xl mx-auto text-blue-100">
          Sistem digital pengawasan internal untuk mendukung tata kelola
          pemerintahan yang lebih baik dan profesional.
        </p>
      </div>
    </div>
  );
}

export default Tentang;
