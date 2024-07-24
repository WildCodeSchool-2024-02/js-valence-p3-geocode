import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPrompt() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 text-center bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Access Restricted
        </h2>
        <p className="mb-4 text-gray-400">
          You need to be logged in to access this page.
        </p>
        <button
          type="button"
          onClick={handleLoginClick}
          className="px-4 py-2 font-bold text-white bg-green-700 rounded hover:bg-green-500 focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPrompt;
