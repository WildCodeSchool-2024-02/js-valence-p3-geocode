import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import links from "../../constant/DashboardAdmin";

export default function Sidebar() {
  return (
    <aside className="col-span-2 px-4 py-12 text-white bg-[#1f2937] border-r border-r-gray-500 ">
      <h2 className="mb-8 text-2xl font-bold border-b-gray-500">
        Welcome Admin !
      </h2>
      <div className="flex flex-col justify-between h-full">
        <nav className="space-y-4">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.id}
              className="block px-4 py-2 rounded hover:bg-[#15803d]"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
        <div>
          <button
            type="button"
            className="flex items-center w-full px-4 py-2 mb-6 text-white rounded-lg hover:bg-[#15803d]"
          >
            Log Out
            <FaSignOutAlt className="ml-2" />
          </button>
        </div>
      </div>
    </aside>
  );
}
