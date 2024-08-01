import { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { navLinks } from "../../constant/LandingPageConstant";
import profile from "../../assets/images/profile.png";

export default function Header({ onSearch }) {
  const { auth } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/users/${auth.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setUserInfo({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        });
      } catch (err) {
        console.error("Error fetching user info:", err.message);
      }
    };

    fetchUserInfo();
  }, [auth]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-800">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          className="px-4 py-1 border-gray-500 rounded-lg"
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-1 rounded-lg hover:bg-[#15803d] border text-white"
        >
          Search
        </button>
      </form>
      <div className="flex items-center gap-10 text-white">
        <span className="text-lg">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="p-0 border border-gray-500 rounded-full focus:outline-none"
          >
            <img
              src={profile}
              alt="Profile"
              className="w-12 h-12 border border-gray-500 rounded-full"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 w-48 mt-2 text-black bg-white border border-gray-300 rounded shadow-lg">
              {navLinks
                .filter((link) => link.id !== "logIn" && link.id !== "register")
                .map((link) => (
                  <NavLink
                    key={link.id}
                    to={`/${link.id.toLowerCase()}`}
                    className="block w-full px-4 py-2 text-left hover:bg-[#15803d]"
                  >
                    {link.title}
                  </NavLink>
                ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
