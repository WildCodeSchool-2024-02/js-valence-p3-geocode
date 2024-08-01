import { useEffect, useState } from "react";

export default function Table() {
  const [dataCars, setDataCars] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [editingCar, setEditingCar] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/vehicles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles.");
        }

        const data = await response.json();
        setDataCars(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getAllCars();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteConfirmation(id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation) {
      try {
        const response = await fetch(
          `http://localhost:3310/api/vehicles/${deleteConfirmation}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete vehicle");
        }

        const updatedData = dataCars.filter(
          (car) => car.id !== deleteConfirmation
        );
        setDataCars(updatedData);

        setSuccessMessage("Vehicle deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        console.error("Failed to delete vehicle:", err);
        setError(err.message);
      } finally {
        setDeleteConfirmation(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(null);
  };

  const handleEditClick = (car) => {
    setEditingCar({ ...car });
  };

  const handleEditCancel = () => {
    setEditingCar(null);
  };

  const handleEditChange = (e) => {
    setEditingCar({ ...editingCar, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3310/api/vehicles/${editingCar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingCar),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update vehicle");
      }

      const updatedCars = dataCars.map((car) =>
        car.id === editingCar.id ? editingCar : car
      );
      setDataCars(updatedCars);

      setEditingCar(null);
      setSuccessMessage("Vehicle updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update vehicle:", err);
      setError(err.message);
    }
  };

  if (!dataCars.length) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(dataCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dataCars.slice(startIndex, startIndex + itemsPerPage);

  const totalRows = dataCars.length;

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  console.info(error);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {successMessage && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          {successMessage}
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(dataCars[0] || {})
              .concat("Actions")
              .map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((car, index) => (
            <tr
              key={car.id}
              className={`${
                index % 2 === 0
                  ? "bg-gray-800 dark:bg-gray-900"
                  : "bg-gray-200 dark:bg-gray-700"
              } border-b dark:border-gray-700 hover:bg-green-900`}
            >
              {Object.keys(car)
                .concat("Actions")
                .map((key, idx) =>
                  key === "Actions" ? (
                    <td key={key} className="px-6 py-4 text-right">
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(car)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(car.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td key={idx} className="px-6 py-4">
                      {car[key]}
                    </td>
                  )
                )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages} | Total Cars : {totalRows}
        </span>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
          <div className="p-5 bg-gray-700 rounded-lg text-slate-200">
            <h2 className="mb-4 text-xl">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this vehicle?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editingCar && (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
          <div className="w-1/2 p-5 bg-gray-700 rounded-lg text-slate-200">
            <h2 className="mb-4 text-xl">Edit Vehicle</h2>
            <form onSubmit={handleEditSubmit}>
              {Object.keys(editingCar).map((key) =>
                key !== "id" ? (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-300"
                    >
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={editingCar[key]}
                      onChange={handleEditChange}
                      className="block w-full mt-1 text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                ) : null
              )}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="px-4 py-2 text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
