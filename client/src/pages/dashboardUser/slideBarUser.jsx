import { useState, useContext, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaCar,
  FaBook,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { AuthContext } from "../../components/AuthContext";

function Sidebar() {
  const [image, setImage] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="bg-gray-800 w-64 min-h-screen flex flex-col justify-between items-center p-4">
      <div className="flex flex-col items-center pt-8 space-y-8">
        <NavLink
          to="/"
          className="flex items-center justify-center w-full mb-8"
        >
          <FaHome className="text-white text-4xl" />
        </NavLink>
        <div className="relative bg-gray-600 rounded-full h-32 w-32">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="rounded-full h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-white">Upload</span>
            </div>
          )}
        </div>
        <div className="text-white text-center">
          <h2 className="text-lg font-semibold">Guzman Kaled</h2>
        </div>
        <nav className="flex flex-col space-y-4 w-full items-start">
          <NavLink
            to="information"
            className="w-full flex items-center px-4 py-2 text-white hover:text-gray-400 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaInfoCircle className="mr-2" /> Informations
          </NavLink>
          <NavLink
            to="cars"
            className="w-full flex items-center px-4 py-2 text-white hover:text-gray-400 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaCar className="mr-2" /> Cars
          </NavLink>
          <NavLink
            to="books"
            className="w-full flex items-center px-4 py-2 text-white hover:text-gray-400 rounded-lg"
            activeClassName="bg-gray-700"
          >
            <FaBook className="mr-2" /> Bookings
          </NavLink>
        </nav>
      </div>
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
  );
}

export default Sidebar;
