import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { logo, profile } from "../assets/index";
import { navLinks } from "../constant/LandingPageConstant";

export default function NavBar() {
  const location = useLocation();
  const isMapPage = location.pathname === "/map";
  const { auth, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const handleProfileClick = useCallback(() => {
    const role = localStorage.getItem("role") || "User";
    if (role === "Admin") {
      navigate("/dashboardAdmin/users");
    } else {
      navigate("/dashboardUser/information");
    }
    setIsDropdownOpen(false);
  }, [navigate]);

  return (
    <div
      className={`fixed top-0 left-0 z-20 flex items-center w-full px-20 place-content-between ${
        isMapPage ? "bg-[#1F2937]" : "bg-transparent"
      }`}
    >
      <div>
        <a href="/">
          <img src={logo} alt="Company Logo" className="w-32 p-4" />
        </a>
      </div>
      <div className="flex items-center gap-10">
        <ul className="flex items-center gap-10">
          {navLinks
            .filter(
              (link) =>
                !auth.isAuthenticated ||
                (auth.isAuthenticated &&
                  link.id !== "logIn" &&
                  link.id !== "register")
            )
            .map((link) => (
              <li
                key={link.id}
                className="text-xl hover:bg-[#15803d] rounded-xl px-4 py-2 text-neutral-50"
              >
                <NavLink to={`/${link.id}`}>{link.title}</NavLink>
              </li>
            ))}
          {auth.isAuthenticated && (
            <div className="flex items-center gap-10 text-white">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={handleDropdownToggle}
                  onKeyDown={(e) => e.key === "Enter" && handleDropdownToggle()}
                  tabIndex="0"
                  className="p-0 border border-gray-500 rounded-full focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-12 h-12 border border-gray-500 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 text-black bg-white border border-gray-300 rounded shadow-lg">
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="block w-full px-4 py-2 text-left hover:bg-[#15803d]"
                    >
                      My Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left hover:bg-red-500"
                      onKeyDown={(e) => e.key === "Enter" && handleLogout()}
                      tabIndex="0"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

