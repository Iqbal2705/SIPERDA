import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

function DashboardAdminLayout() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <SidebarAdmin />

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardAdminLayout;