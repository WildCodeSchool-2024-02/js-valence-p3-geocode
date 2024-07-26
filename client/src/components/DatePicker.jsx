import React from "react";
import PropTypes from "prop-types";

export default function DatePicker({ onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <form>
      <input
        type="date"
        id="date"
        name="date"
        className="w-full text-center text-gray-500 bg-[#333] border border-[#444] rounded py-1"
        onChange={handleChange}
      />
    </form>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};
