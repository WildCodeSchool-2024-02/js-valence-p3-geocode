import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../components/AuthContext";

function CarsUser({ updateNumVehicles }) {
  const { auth } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    picture: "",
    priseType: "",
  });
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/vehicles/${auth.userId}`,
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
        setCars(data.data);
        if (data.data.length > 0) {
          setSelectedCar(data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching cars:", err.message);
      }
    };

    fetchCars();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCar = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ ...newCar, user_id: auth.userId }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const addedCar = await response.json();
      setCars((prev) => [...prev, addedCar.data]);
      setSelectedCar(addedCar.data);
      setNewCar({
        brand: "",
        model: "",
        picture: "",
        priseType: "",
      });

      updateNumVehicles();
    } catch (err) {
      console.error("Error adding car:", err.message);
    }
  };

  const handleUpdateCar = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/vehicles/${selectedCar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(selectedCar),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedCar = await response.json();
      setCars((prev) =>
        prev.map((car) =>
          car.id === updatedCar.data.id ? updatedCar.data : car
        )
      );
      setEditMode(null);

      updateNumVehicles();
    } catch (err) {
      console.error("Error updating car:", err.message);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/vehicles/${carId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setCars((prev) => prev.filter((car) => car.id !== carId));
      setSelectedCar(null);

      updateNumVehicles();
    } catch (err) {
      console.error("Error deleting car:", err.message);
    }
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setEditMode(null);
  };

  const handleEditCar = () => {
    setEditMode(selectedCar.id);
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCar((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 text-gray-900 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Available Cars</h2>
      <div className="flex">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white p-4 rounded-lg cursor-pointer shadow-xl hover:shadow-md transition"
              onClick={() => handleSelectCar(car)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectCar(car);
                }
              }}
            >
              <img
                src={car.picture}
                alt={car.model}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-gray-900 font-semibold">{car.brand}</h3>
              <p className="text-gray-600">Model: {car.model}</p>
              <p className="text-gray-600">Type: {car.priseType}</p>
            </div>
          ))}
        </div>
        {selectedCar && (
          <div className="flex-1 bg-white p-4 rounded-lg ml-4 shadow-xl">
            {editMode === selectedCar.id ? (
              <>
                <h3 className="text-gray-900 font-semibold mb-4">
                  Edit Car Info
                </h3>
                <div className="flex items-center mb-4">
                  <img
                    src={selectedCar.picture}
                    alt={selectedCar.model}
                    className="w-1/3 h-48 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      name="brand"
                      value={selectedCar.brand}
                      onChange={handleCarInputChange}
                      className="w-full p-2 mb-2 bg-gray-100 text-gray-900 rounded border border-gray-300"
                      placeholder="Brand"
                    />
                    <input
                      type="text"
                      name="model"
                      value={selectedCar.model}
                      onChange={handleCarInputChange}
                      className="w-full p-2 mb-2 bg-gray-100 text-gray-900 rounded border border-gray-300"
                      placeholder="Model"
                    />
                    <input
                      type="text"
                      name="priseType"
                      value={selectedCar.priseType}
                      onChange={handleCarInputChange}
                      className="w-full p-2 mb-2 bg-gray-100 text-gray-900 rounded border border-gray-300"
                      placeholder="Type"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleUpdateCar}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mr-2"
                >
                  <FaSave className="inline mr-2" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(null)}
                  className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-gray-900 font-semibold mb-4">Car Info</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={selectedCar.picture}
                    alt={selectedCar.model}
                    className="w-1/3 h-48 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold">
                      {selectedCar.brand}
                    </h3>
                    <p className="text-gray-600">Model: {selectedCar.model}</p>
                    <p className="text-gray-600">
                      Type: {selectedCar.priseType}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleEditCar}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 mr-2"
                >
                  <FaEdit className="inline mr-2" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCar(selectedCar.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                >
                  <FaTrash className="inline mr-2" />
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Add New Car</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            value={newCar.brand}
            onChange={handleInputChange}
            placeholder="Brand"
            className="p-2 rounded bg-white text-gray-900 border border-gray-300"
          />
          <input
            type="text"
            name="model"
            value={newCar.model}
            onChange={handleInputChange}
            placeholder="Model"
            className="p-2 rounded bg-white text-gray-900 border border-gray-300"
          />
          <input
            type="text"
            name="picture"
            value={newCar.picture}
            onChange={handleInputChange}
            placeholder="Picture URL"
            className="p-2 rounded bg-white text-gray-900 border border-gray-300"
          />
          <input
            type="text"
            name="priseType"
            value={newCar.priseType}
            onChange={handleInputChange}
            placeholder="Type"
            className="p-2 rounded bg-white text-gray-900 border border-gray-300"
          />
          <button
            type="button"
            onClick={handleAddCar}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
          >
            Add Car
          </button>
        </div>
      </div>
    </div>
  );
}

CarsUser.propTypes = {
  updateNumVehicles: PropTypes.func.isRequired,
};

export default CarsUser;
