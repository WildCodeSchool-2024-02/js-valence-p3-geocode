import { useState, useEffect, useContext } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../components/AuthContext";

function InformationsUser() {
  const { auth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editedInfo, setEditedInfo] = useState({});

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
        setUserInfo(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user info:", err.message);
      }
    };

    fetchUserInfo();
  }, [auth]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    setEditedInfo({ ...editedInfo, [field]: userInfo[field] });
  };

  const handleCancel = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setEditedInfo({ ...editedInfo, [field]: userInfo[field] });
  };

  const handleChange = (field, value) => {
    setEditedInfo({ ...editedInfo, [field]: value });
  };

  const handleSave = async (field) => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/users/${auth.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ [field]: editedInfo[field] }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      if (!updatedUser.data) {
        throw new Error("No data returned from server");
      }
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [field]: updatedUser.data[field],
      }));
      setEditMode({ ...editMode, [field]: false });
    } catch (err) {
      setError(err.message);
      console.error("Error updating user info:", err.message);
    }
  };

  const handleKeyDown = (event, field) => {
    if (event.key === "Enter") {
      handleSave(field);
    }
  };

  const excludedFields = ["role", "user_id"];

  return (
    <div className="bg-white shadow rounded-xl p-9 space-y-9 flex flex-col justify-center items-center min-h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        User Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {Object.entries(userInfo)
          .filter(([field]) => !excludedFields.includes(field))
          .map(([field, value]) => (
            <div key={field} className="flex flex-col items-start w-full">
              <label
                className="text-xl text-gray-700 mb-2 w-full"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative w-full">
                <input
                  className="w-full px-4 py-2 leading-tight text-gray-900 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  id={field}
                  type={field === "password" ? "password" : "text"}
                  value={editMode[field] ? editedInfo[field] : value || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                  disabled={!editMode[field]}
                />
                {!editMode[field] ? (
                  <FaEdit
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    onClick={() => handleEdit(field)}
                  />
                ) : (
                  <>
                    <FaSave
                      className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleSave(field)}
                    />
                    <FaTimes
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleCancel(field)}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InformationsUser;
