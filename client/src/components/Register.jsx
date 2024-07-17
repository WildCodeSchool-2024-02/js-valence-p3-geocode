import { useState } from "react";

export default function Register() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
  
      if (password !== confirmPassword ) {
        setError("Passwords do not match");
      } else if (!passwordRegex.test(password)) {
        setError("Password must be at least 8 characters long and include at least one letter, one number, and one symbol");
      } else {
        setError("");
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-16 text-center text-2xl font-bold text-[#21A89A]">
          Sign up for your account !
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="last-name"
                type="text"
                placeholder="name..."
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="first-name"
                type="text"
                placeholder="last name..."
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
              >
                <option>Choose...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="dob"
              >
                Date of Birth
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="dob"
                type="text"
                placeholder="jj/mm/aaaa"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="postal-code"
              >
                Postal Code
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="postal-code"
                type="text"
                placeholder="postal code..."
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
                placeholder="city..."
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="num-vehicles"
              >
                Number of Electric Vehicles
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="num-vehicles"
                type="text"
                placeholder="number of vehicles..."
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-400"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                placeholder="******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="py-5 text-xs italic text-red-500 ">{error}</p>}
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
