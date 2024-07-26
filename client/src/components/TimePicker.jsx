import PropTypes from "prop-types";

export default function TimePicker({ onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <form>
      <input
        type="time"
        id="time"
        name="time"
        className="w-full text-center text-gray-500 bg-[#333] border border-[#444] rounded py-1"
        onChange={handleChange}
      />
    </form>
  );
}

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};
