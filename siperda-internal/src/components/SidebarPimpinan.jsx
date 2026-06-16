import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiBarChart2,
  FiClock,
  FiDatabase,
  FiDownload,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

function SidebarPimpinan() {
  const menus = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
      path: "/dashboard-pimpinan",
    },
    {
      name: "Ringkasan Laporan",
      icon: <FiBarChart2 />,
      path: "/dashboard-pimpinan/ringkasan",
    },
    {
      name: "Riwayat Laporan",
      icon: <FiClock />,
      path: "/dashboard-pimpinan/riwayat",
    },
    {
      name: "Laporan Unit Kerja",
      icon: <FiDatabase />,
      path: "/dashboard-pimpinan/unit-kerja",
    },
    {
      name: "Export Data",
      icon: <FiDownload />,
      path: "/dashboard-pimpinan/export",
    },
  ];

  return (
    <aside className="w-[320px] min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="logo"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold text-white">SIPERDA</h1>

              <p className="text-slate-400">Pimpinan</p>
            </div>
          </div>

          {/* USER */}
          <div className="mt-8 bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <FiUser className="text-white text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-white">Pimpinan</h3>

                <p className="text-sm text-slate-400">pimpinan@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="p-5">
          <p className="text-slate-500 text-xs uppercase mb-4 tracking-widest">
            Menu Utama
          </p>

          <div className="flex flex-col gap-3">
            {menus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                end={menu.path === "/dashboard-pimpinan"}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  px-5 py-4
                  rounded-2xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `
                }
              >
                <span className="text-xl">{menu.icon}</span>

                <span className="font-medium">{menu.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-5 border-t border-slate-800">
        <NavLink
          to="/"
          className="
            flex items-center gap-4
            px-5 py-4
            rounded-2xl
            text-red-400
            hover:bg-red-500/10
            transition
          "
        >
          <FiLogOut className="text-xl" />

          <span>Keluar</span>
        </NavLink>

        <div className="mt-6 text-center text-xs text-slate-500">
          SIPERDA INTERNAL v1.0
        </div>
      </div>
    </aside>
  );
}

export default SidebarPimpinan;
