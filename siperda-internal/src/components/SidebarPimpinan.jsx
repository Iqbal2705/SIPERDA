import { NavLink } from "react-router-dom";

import {
  FiGrid,
  FiBarChart2,
  FiClock,
  FiDatabase,
  FiDownload,
  FiLogOut,
} from "react-icons/fi";

function SidebarPimpinan() {
  return (
    <div className="w-[280px] bg-white min-h-screen shadow-lg flex flex-col justify-between">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-4 p-6 border-b">
          <img src="/logo.png" className="w-14" />

          <div>
            <h1 className="font-bold text-blue-700 text-2xl">SIPERDA</h1>

            <p className="text-sm text-gray-500">Pimpinan</p>
          </div>
        </div>

        {/* MENU */}
        <div className="p-5 flex flex-col gap-3">
          <NavLink
            to="/dashboard-pimpinan"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-100"
          >
            <FiGrid />
            Dashboard
          </NavLink>

          <NavLink
            to="/ringkasan-laporan"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-100"
          >
            <FiBarChart2 />
            Ringkasan Laporan
          </NavLink>

          <NavLink
            to="/riwayat-pimpinan"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-100"
          >
            <FiClock />
            Riwayat Laporan
          </NavLink>

          <NavLink
            to="/laporan-unit"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-100"
          >
            <FiDatabase />
            Laporan Unit Kerja
          </NavLink>

          <NavLink
            to="/export-data"
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-100"
          >
            <FiDownload />
            Export Data
          </NavLink>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="p-5 border-t">
        <NavLink
          to="/"
          className="flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-100"
        >
          <FiLogOut />
          Keluar
        </NavLink>
      </div>
    </div>
  );
}

export default SidebarPimpinan;
