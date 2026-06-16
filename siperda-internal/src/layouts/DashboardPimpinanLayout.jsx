import { Outlet } from "react-router-dom";
import SidebarPimpinan from "../components/SidebarPimpinan";

function DashboardPimpinanLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <SidebarPimpinan />

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardPimpinanLayout;