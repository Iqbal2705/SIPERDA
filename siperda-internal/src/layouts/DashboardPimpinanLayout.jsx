import { Outlet } from "react-router-dom";
import SidebarPimpinan from "../components/SidebarPimpinan";

function DashboardPimpinanLayout() {
  return (
    <div className="flex bg-[#f5f7fb]">
      <SidebarPimpinan />

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPimpinanLayout;
