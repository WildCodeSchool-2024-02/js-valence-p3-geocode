import { Outlet } from "react-router-dom";
import Sidebar from "./dashboardAdmin/Sidebar";
import Header from "./dashboardAdmin/Header";

export default function DashboardAdmin() {
  return (
    <div className="grid min-h-screen grid-cols-12 ">
      <Sidebar />
      <div className="grid col-span-10 grid-rows-7">
        <Header />
        <main className="h-full row-span-6 p-4 text-white bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
