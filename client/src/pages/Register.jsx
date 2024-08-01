import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    postalCode: "",
    city: "",
    role: "User",
    numVehicles: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (password !== confirmPassword) {
      setErrors({ submit: "Passwords do not match" });
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrors({
        submit:
          "Password must be at least 8 characters long and include at least one letter, one number, and one symbol",
      });
      return;
    }

    setErrors({});

    try {
      const response = await fetch("http://localhost:3310/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("User created successfully", data);
        navigate("/map");
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        setErrors({
          submit:
            errorData.message || "Failed to create user. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Failed to create user. Please try again." });
    }
    console.info(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-24 overflow-hidden bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-10 text-center text-2xl font-bold text-[#21A89A]">
          Sign up for your account!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                className="w-full px-3 py-2 leading-tight text-gray-400 bg-transparent border-b-2 border-gray-600 appearance-none focus:outline-none focus:shadow-outline"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  Choose...
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="birthDate"
              >
                Date of Birth
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="birthDate"
                type="date"
                placeholder="dd/mm/yyyy"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="postalCode"
              >
                Postal Code
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="postalCode"
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="numVehicles"
              >
                Number of Electric Vehicles
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="numVehicles"
                type="text"
                placeholder="Number of Vehicles"
                value={formData.numVehicles}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="******"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {errors.submit && (
            <p className="py-5 text-xs italic text-red-500">{errors.submit}</p>
          )}
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Me Up!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
