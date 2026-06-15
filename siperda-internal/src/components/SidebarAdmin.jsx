import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiClock,
  FiSettings,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

function SidebarAdmin() {
  const menus = [
    {
      name: "Dashboard",
      icon: <FiGrid />,
      path: "/dashboard-admin",
    },
    {
      name: "Laporan Masuk",
      icon: <FiFileText />,
      path: "/dashboard-admin/laporan-masuk",
    },
    {
      name: "Riwayat Laporan",
      icon: <FiClock />,
      path: "/dashboard-admin/riwayat-laporan",
    },
    {
      name: "Pengaturan",
      icon: <FiSettings />,
      path: "/dashboard-admin/pengaturan",
    },
  ];

  return (
    <aside className="w-[320px] min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col justify-between sticky top-0">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h1 className="text-4xl font-bold text-white">SIPERDA</h1>

              <p className="text-slate-400 text-lg">Internal</p>
            </div>
          </div>

          {/* USER */}
          <div className="mt-8 bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center">
                <FiUser className="text-white text-2xl" />
              </div>

              <div>
                <h3 className="font-semibold text-white text-xl">
                  Admin Inspektorat
                </h3>

                <p className="text-slate-400">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="p-5">
          <h4 className="text-slate-500 text-xs uppercase tracking-[4px] mb-5">
            Menu Utama
          </h4>

          <div className="space-y-3">
            {menus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                end={menu.path === "/dashboard-admin"}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4
                  px-5 py-4
                  rounded-2xl
                  transition-all duration-300
                  font-medium text-lg
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `
                }
              >
                <span className="text-2xl">{menu.icon}</span>

                <span>{menu.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-slate-800 p-5">
        <NavLink
          to="/"
          className="
            flex items-center gap-4
            px-5 py-4
            rounded-2xl
            text-red-400
            hover:bg-red-500/10
            transition-all
            text-lg
          "
        >
          <FiLogOut className="text-2xl" />

          <span>Keluar</span>
        </NavLink>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">SIPERDA INTERNAL v1.0</p>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
