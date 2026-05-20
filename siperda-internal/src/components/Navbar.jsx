import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,1)",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.10)"
          : "0 1px 0 rgba(0,0,0,0.06)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <img
            src="/logo.png"
            alt="logo"
            className="w-14 transition-transform duration-300 group-hover:scale-110"
          />
          <span
            className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }}
          />
        </div>

        <div>
          <h1 className="font-bold text-2xl tracking-tight leading-none">
            SIPERDA
            <span className="text-sky-500">-</span>
            INTERNAL
          </h1>
          <p className="text-xs text-gray-500 mt-0.5 leading-tight">
            Sistem Informasi Pelaporan Pelanggaran
          </p>
          <p className="text-xs text-gray-500 leading-tight">
            Disiplin Pegawai Internal Inspektorat
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex gap-1 text-sm">
        {[
          { label: "Beranda", to: "/" },
          { label: "Informasi", to: "/informasi" },
          { label: "Tentang", to: "/tentang" },
        ].map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex gap-3 items-center">
        <NavLink
          to="/login"
          className="relative overflow-hidden border border-blue-700 text-blue-700 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-md group"
          style={{ isolation: "isolate" }}
        >
          <span
            className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
            style={{ zIndex: -1 }}
          />
          <span className="relative group-hover:text-white transition-colors duration-300">
            Login
          </span>
        </NavLink>

        <NavLink
          to="/signup"
          className="relative overflow-hidden bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          SignUp
          <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </NavLink>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
