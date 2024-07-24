import { NavLink } from "react-router-dom";
import profile from "../../assets/images/profile.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 bg-gray-800 border border-gray-500 border-l-transparent">
      <div>
        <input
          className="px-4 py-1 border-gray-500 rounded-lg "
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
        />
        <button
          type="submit"
          className=" ml-4 px-4 py-1 rounded-lg hover:bg-[#15803d] border text-white"
        >
          Search
        </button>
      </div>
      <div className="flex items-center gap-10 text-white">
        <p className="text-2xl"> John Doe</p>
        <NavLink to="#">
          <img
            src={profile}
            alt=""
            className="w-12 h-12 border border-gray-500 rounded-full"
          />
        </NavLink>
      </div>
    </header>
  );
}
