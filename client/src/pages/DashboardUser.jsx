import { Outlet } from "react-router-dom";
import Sidebar from "./dashboardUser/slideBarUser";
import Header from "./dashboardUser/Header";

function DashboardUser() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900  flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
