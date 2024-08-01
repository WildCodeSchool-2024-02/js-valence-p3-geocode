import { useCallback, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import links from "../../constant/DashboardAdmin";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);
  return (
    <aside className="col-span-2 px-4 py-12 text-white bg-[#1F2937] border border-gray-500 h-full">
      <div className="w-full mb-20">
        <h2 className="mb-8 text-2xl font-bold border-gray-500">
          Welcome Admin !
        </h2>
      </div>
      <div className="flex flex-col justify-between h-5/6">
        <nav className="space-y-4">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.id}
              className="block px-4 py-2 rounded hover:bg-[#15803D]"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
        <div>
          <button
            type="button"
            className="flex items-center w-full px-4 py-2 mb-6 text-white rounded-lg hover:bg-red-500"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log Out
            <FaSignOutAlt className="ml-2" />
          </button>
        </div>
      </div>
    </aside>
  );
}
