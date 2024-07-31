import { useState, useEffect, useContext } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../components/AuthContext";

function InformationsUser() {
  const { auth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [editedInfo, setEditedInfo] = useState({});
  const [suggestions, setSuggestions] = useState([]);

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

  useEffect(() => {
    const updateNumVehicles = async () => {
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
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          numVehicles: data.data.length,
        }));
      } catch (err) {
        console.error("Error fetching vehicle data:", err.message);
      }
    };

    updateNumVehicles();
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
    setSuggestions([]);
  };

  const handleChange = async (field, value) => {
    setEditedInfo({ ...editedInfo, [field]: value });

    if (field === "city" || field === "postalCode") {
      try {
        let response;
        if (field === "city") {
          response = await fetch(
            `https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,codesPostaux&format=json&geometry=centre`
          );
        } else if (field === "postalCode") {
          response = await fetch(
            `https://geo.api.gouv.fr/communes?codePostal=${value}&fields=nom,codesPostaux&format=json&geometry=centre`
          );
        }
        const data = await response.json();

        if (data && data.length > 0) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (fetchError) {
        console.error("Error fetching geocode data:", fetchError);
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (field, value, relatedValue) => {
    if (field === "city") {
      setEditedInfo({
        ...editedInfo,
        city: value,
        postalCode: relatedValue,
      });
    } else {
      setEditedInfo({
        ...editedInfo,
        postalCode: value,
        city: relatedValue,
      });
    }
    setSuggestions([]);
  };

  const handleSave = async (fields) => {
    try {
      const updatedFieldData = fields.reduce((acc, field) => {
        acc[field] = editedInfo[field];
        return acc;
      }, {});
      console.info("Sending data:", updatedFieldData);
      const response = await fetch(
        `http://localhost:3310/api/users/${auth.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(updatedFieldData),
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
        ...updatedUser.data,
      }));
      setEditMode({});
      setSuggestions([]);
    } catch (err) {
      setError(err.message);
      console.error("Error updating user info:", err.message);
    }
  };

  const handleKeyDown = (event, field) => {
    if (event.key === "Enter") {
      handleSave([field]);
    }
  };

  const excludedFields = ["role", "user_id"];

  return (
    <div className="bg-gray-50 text-gray-900 rounded-lg p-8 space-y-9 flex flex-col justify-center items-center min-h-full">
      <h2 className="text-3xl font-bold mb-6">User Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {Object.entries(userInfo)
          .filter(([field]) => !excludedFields.includes(field))
          .map(([field, value]) => {
            let inputElement;
            if (editMode[field] && field === "gender") {
              inputElement = (
                <select
                  className="w-full px-4 py-2 leading-tight bg-white text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  id={field}
                  value={editedInfo[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              );
            } else if (editMode[field] && field === "birthDate") {
              inputElement = (
                <input
                  className="w-full px-4 py-2 leading-tight bg-white text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  id={field}
                  type="date"
                  value={editedInfo[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                />
              );
            } else {
              inputElement = (
                <input
                  className="w-full px-4 py-2 leading-tight bg-white text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  id={field}
                  type={field === "password" ? "password" : "text"}
                  value={editMode[field] ? editedInfo[field] : value || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, field)}
                  disabled={!editMode[field]}
                />
              );
            }

            return (
              <div key={field} className="flex flex-col items-start w-full">
                <label className="text-xl mb-2 w-full" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative w-full">
                  {inputElement}
                  {editMode[field] &&
                    suggestions.length > 0 &&
                    (field === "city" || field === "postalCode") && (
                      <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion.code}
                            type="button"
                            className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() =>
                              handleSuggestionClick(
                                field,
                                field === "city"
                                  ? suggestion.nom
                                  : suggestion.codesPostaux[0],
                                field === "city"
                                  ? suggestion.codesPostaux[0]
                                  : suggestion.nom
                              )
                            }
                          >
                            {field === "city"
                              ? suggestion.nom
                              : suggestion.codesPostaux[0]}
                          </button>
                        ))}
                      </ul>
                    )}
                  {!editMode[field] ? (
                    <FaEdit
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                      onClick={() => handleEdit(field)}
                    />
                  ) : (
                    <>
                      <FaSave
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() =>
                          field === "city" || field === "postalCode"
                            ? handleSave(["city", "postalCode"])
                            : handleSave([field])
                        }
                      />
                      <FaTimes
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        onClick={() => handleCancel(field)}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default InformationsUser;
