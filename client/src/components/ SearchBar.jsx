import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SiLocal } from "react-icons/si";

const SearchBar = React.forwardRef((props, ref) => (
  <div ref={ref} className="absolute top-7 left-7 w-full flex max-w-3xl z-30">
    <div className="w-full relative flex items-center bg-white p-4 rounded-3xl shadow-md">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-800"
        placeholder="Chercher"
        style={{ marginRight: "40px" }}
      />
      <HiOutlineSearch
        className="text-2xl text-gray-600 z-40"
        style={{ position: "absolute", right: "48px" }}
      />
      <SiLocal
        className="text-2xl text-blue-500 cursor-pointer z-40"
        style={{ position: "absolute", right: "16px" }}
      />
    </div>
  </div>
));

SearchBar.displayName = "SearchBar";

export default SearchBar;
