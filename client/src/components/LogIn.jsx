import { useState } from "react";

export default function LogIn() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

        if (password !== confirmPassword ) {
      setError("Passwords do not match")
    } else {
      setError("");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#21A89A] mb-6">Sign in to your account!</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="email">
            Your email
          </label>
          <input
            className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full px-3 py-2 text-white bg-transparent border-0 border-b-2 border-gray-600 rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="py-8 text-xs text-red-500">{error}</p>}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-gray-400">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember me</span>
          </label>
          <a className="text-sm font-bold text-green-700 hover:text-green-500 hover:underline" href="/">
            Forgot password?
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
        Don't have an account yet? <a className="font-bold text-green-700 hover:text-green-500 hover:underline" href="/">Sign up</a>
      </p>
    </div>
  );
}
