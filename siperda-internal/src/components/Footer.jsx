function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white px-10 py-8"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #0369a1 100%)",
      }}
    >
      {/* Animated background rings */}
      <div
        className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
        }}
      />
      <div
        className="absolute top-5 left-20 w-24 h-24 rounded-full opacity-5"
        style={{
          background: "rgba(255,255,255,0.4)",
          animation: "floatSlow 6s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 flex flex-col gap-2">
        <h1 className="font-extrabold text-2xl tracking-wide uppercase flex items-center gap-3 group">
          <span className="inline-block w-1 h-7 rounded-full bg-sky-300 group-hover:h-9 transition-all duration-300" />
          Inspektorat Kota Pekanbaru
        </h1>

        <div className="flex flex-col gap-1 ml-4 mt-1">
          <p className="text-white/75 text-sm flex items-center gap-2 hover:text-white transition-colors duration-200 cursor-default group">
            <svg
              className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Jl. Komplek Perkantoran, Pekanbaru
          </p>

          <a
            href="mailto:inspektoratkotapekanbaru@gmail.com"
            className="text-white/75 text-sm flex items-center gap-2 hover:text-sky-300 transition-colors duration-200 group w-fit"
          >
            <svg
              className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            inspektoratkotapekanbaru@gmail.com
          </a>
        </div>

        <p className="text-white/40 text-xs mt-2 ml-4">
          © {new Date().getFullYear()} Inspektorat Kota Pekanbaru. Hak cipta
          dilindungi.
        </p>
      </div>

      {/* City image — kept from original */}
      <img
        src="/footer-city.png"
        className="absolute bottom-0 right-0 w-[300px] opacity-70 transition-all duration-500 hover:opacity-90 hover:scale-105"
        style={{ transformOrigin: "bottom right" }}
        alt=""
      />

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
