import { useEffect, useState } from "react";

export default function Table() {
  const [dataUsers, setDataUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setDataUsers(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getAllUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setDeleteConfirmation(userId);
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation) {
      try {
        const response = await fetch(
          `http://localhost:3310/api/users/${deleteConfirmation}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete user");
        }

        const updatedData = dataUsers.filter(
          (user) => user.user_id !== deleteConfirmation
        );
        setDataUsers(updatedData);

        setSuccessMessage("User deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 seconds
      } catch (err) {
        setError(err.message);
      } finally {
        setDeleteConfirmation(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(null);
  };

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
  };

  const handleEditCancel = () => {
    setEditingUser(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(
        `http://localhost:3310/api/users/${editingUser.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const updatedUsers = dataUsers.map((user) =>
        user.user_id === editingUser.user_id ? editingUser : user
      );
      setDataUsers(updatedUsers);

      setEditingUser(null);
      setSuccessMessage("User updated successfully");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 seconds
    } catch (err) {
      setError(err.message);
    }
  };

  if (!dataUsers.length) {
    return <p>Loading...</p>;
  }

  const headers = Object.keys(dataUsers[0]).filter((key) => key !== "password");
  const totalPages = Math.ceil(dataUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dataUsers.slice(startIndex, startIndex + itemsPerPage);

  const totalRows = dataUsers.length;

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {headers.concat("Actions").map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((user, index) => (
              <tr
                key={user.user_id}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-800 dark:bg-gray-900"
                    : "bg-gray-200 dark:bg-gray-700"
                } border-b dark:border-gray-700 hover:bg-green-900`}
              >
                {headers.concat("Actions").map((key, idx) =>
                  key === "Actions" ? (
                    <td key={key} className="px-6 py-4 text-right">
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteClick(user.user_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td key={idx} className="max-w-xs px-6 py-4 truncate">
                      {user[key]}
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
            Page {currentPage} of {totalPages} | Total Users: {totalRows}
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
              <p className="mb-4">Are you sure you want to delete this user?</p>
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

        {editingUser && (
          <div className="fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
            <div className="w-1/2 p-5 bg-gray-700 rounded-lg text-slate-200">
              <h2 className="mb-4 text-xl">Edit User</h2>
              <form onSubmit={handleEditSubmit}>
                {Object.keys(editingUser).map((key) =>
                  key !== "user_id" ? (
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
                        value={editingUser[key]}
                        onChange={handleEditChange}
                        className="block w-full mt-1 text-gray-900 bg-gray-200 rounded-lg"
                      />
                    </div>
                  ) : null
                )}
                <div className="flex justify-end space-x-2">
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
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
