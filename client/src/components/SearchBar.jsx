import React from "react";

const SearchBar = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="absolute top-20 flex max-w-xl z-30"
    style={{ right: "3rem" }}
  >
    <div className="w-full relative flex items-center bg-white p-4 rounded-3xl shadow-md">
      <input
        type="text"
        className="w-full px-4 py-2 text-gray-800"
        placeholder="Chercher"
      />
    </div>
  </div>
));

SearchBar.displayName = "SearchBar";

export default SearchBar;
