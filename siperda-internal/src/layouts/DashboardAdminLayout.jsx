import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";

function DashboardAdminLayout() {
  return (
    <div className="flex bg-[#f5f7fb]">
      <SidebarAdmin />

      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardAdminLayout;
