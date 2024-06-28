import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaInfoCircle, FaCar, FaBook, FaSignOutAlt } from "react-icons/fa"; // Importing icons from react-icons

function Sidebar() {
  const [image, setImage] = useState(null);

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

  return (
    <div className="bg-gray-800 w-96 min-h-screen flex flex-col justify-between items-center">
      <div className="flex flex-col items-center pt-12 justify-center space-y-12">
        <div className="relative bg-gray-600 rounded-full h-64 w-64">
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

        <nav className="flex flex-col space-y-6 w-full items-start pl-6">
          <NavLink
            to="information"
            className="h-16 w-full rounded-lg flex items-center text-white hover:text-gray-400"
            activeClassName="bg-gray-700"
          >
            Informations
            <FaInfoCircle className="ml-auto mr-6" />
          </NavLink>
          <NavLink
            to="cars"
            className="h-16 w-full rounded-lg flex items-center text-white hover:text-gray-400"
            activeClassName="bg-gray-700"
          >
            Cars
            <FaCar className="ml-auto mr-6" />
          </NavLink>
          <NavLink
            to="books"
            className="h-16 w-full rounded-lg flex items-center text-white hover:text-gray-400"
            activeClassName="bg-gray-700"
          >
            Bookings
            <FaBook className="ml-auto mr-6" />
          </NavLink>
        </nav>
      </div>

      <button
        type="button"
        className="mb-6 text-white py-2 px-4 rounded-lg hover:text-gray-400 flex items-center"
      >
        Log Out
        <FaSignOutAlt className="ml-2" />
      </button>
    </div>
  );
}

export default Sidebar;
