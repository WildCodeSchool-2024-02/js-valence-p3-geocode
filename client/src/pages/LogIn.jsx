import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ submit: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.info("User logged in successfully");
        localStorage.setItem("id_login_user", data.id_login_user);
        navigate("/map");
      } else {
        const errorData = await response.json();
        console.error("Error logging in:", errorData);
        setErrors({
          submit: errorData.message || "Failed to login. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Failed to login. Please try again." });
    }

    console.info(formData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-11">
        <h2 className="text-2xl font-bold text-[#21A89A] mb-10">
          Sign in to your account!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 text-sm font-bold text-gray-400 "
              htmlFor="email"
            >
              Your email
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              id="emailLogin"
              name="email"
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
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              id="passwordLogin"
              name="password"
              type="password"
              placeholder="********"
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
              className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              id="confirmPasswordLogin"
              name="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {errors.submit && (
            <p className="py-8 text-xs text-red-500">{errors.submit}</p>
          )}
          <div className="flex items-center justify-between mb-4">
            <a
              className="text-sm font-bold text-green-700 hover:text-green-500 hover:underline"
              href="/"
            >
              Forgot password ?
            </a>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-500 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign in!
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          Don't have an account yet?{" "}
          <a
            className="font-bold text-green-700 hover:text-green-500 hover:underline"
            href="/Register"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
