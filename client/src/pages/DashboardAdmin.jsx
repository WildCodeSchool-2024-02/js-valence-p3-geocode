import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./dashboardAdmin/Sidebar";
import Header from "./dashboardAdmin/Header";

export default function DashboardAdmin() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="grid min-h-screen grid-cols-12">
      <Sidebar />
      <div className="grid col-span-10 grid-rows-7">
        <Header onSearch={handleSearchChange} />
        <main className="row-span-6 p-4 text-white bg-gray-900">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}
