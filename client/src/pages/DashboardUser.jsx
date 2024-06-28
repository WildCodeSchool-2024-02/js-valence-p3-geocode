import { Outlet } from "react-router-dom";
import Sidebar from "../components/SlideBar";

function DashboardUser() {
  return (
    <div className="bg-[#9CA3AF] dark:bg-gray-900 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardUser;
