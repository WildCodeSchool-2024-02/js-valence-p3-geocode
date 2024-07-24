import { useState } from "react";
import { NavLink } from "react-router-dom";
import profile from "../../assets/images/profile.png";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="flex items-center justify-between px-8 bg-gray-800 border border-gray-500 border-l-transparent">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          className="px-4 py-1 border-gray-500 rounded-lg"
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-1 rounded-lg hover:bg-[#15803d] border text-white"
        >
          Search
        </button>
      </form>
      <div className="flex items-center gap-10 text-white">
        <NavLink to="#">
          <img
            src={profile}
            alt="Profile"
            className="w-12 h-12 border border-gray-500 rounded-full"
          />
        </NavLink>
      </div>
    </header>
  );
}
