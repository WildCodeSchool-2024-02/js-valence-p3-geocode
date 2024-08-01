import { Outlet } from "react-router-dom";
import Sidebar from "./dashboardUser/slideBarUser";
import Header from "./dashboardUser/Header";

function DashboardUser() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
