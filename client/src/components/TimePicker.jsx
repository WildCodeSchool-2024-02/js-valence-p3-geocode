import PropTypes from "prop-types";
import { useState } from "react";

export default function TimePicker({ onChange, interval, reservedTimes }) {
  const [time, setTime] = useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
    onChange(event.target.value);
  };

  const isReserved = (timeString) => reservedTimes.includes(timeString);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        if (!isReserved(timeString)) {
          times.push(
            <option key={timeString} value={timeString}>
              {timeString}
            </option>
          );
        }
      }
    }
    return times;
  };

  return (
    <select
      value={time}
      onChange={handleChange}
      className="w-full text-center text-gray-500 bg-[#333] border border-[#444] rounded py-1"
    >
      <option value="">Sélectionnez une heure</option>
      {generateTimeOptions()}
    </select>
  );
}

TimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  interval: PropTypes.number.isRequired,
  reservedTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
