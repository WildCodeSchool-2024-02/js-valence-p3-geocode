import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt, FaClock, FaPhone, FaInfoCircle } from "react-icons/fa";
import { DatePicker, TimePicker } from "./index";

function Sidebar({ selectedStation, closeSidebar }) {
  const [reservationData, setReservationData] = useState({
    dateReservation: null,
    checkIn: null,
    checkOut: null,
  });

  useEffect(() => {
    console.info("Selected Station data:", selectedStation);
  }, [selectedStation]);

  const handleDateChange = (date) => {
    setReservationData({
      ...reservationData,
      dateReservation: new Date(date),
    });
  };

  const handleCheckInChange = (time) => {
    setReservationData({ ...reservationData, checkIn: time });
  };

  const handleCheckOutChange = (time) => {
    setReservationData({ ...reservationData, checkOut: time });
  };

  const handleReservation = async () => {
    if (
      reservationData.dateReservation &&
      reservationData.checkIn &&
      reservationData.checkOut &&
      selectedStation.stationID
    ) {
      const createAt = new Date().toISOString().split("T")[0];
      const dateReservation = reservationData.dateReservation
        .toISOString()
        .split("T")[0];
      const { checkIn } = reservationData;
      const { checkOut } = reservationData;

      const reservationDetails = {
        stationID: selectedStation.stationID,
        createAt,
        dateReservation,
        checkIn,
        checkOut,
        userID: 1,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationDetails),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.info("Réservation réussie");
        closeSidebar();
      } else {
        console.error("Erreur lors de la réservation:", responseData);
        console.info(
          `Erreur lors de la réservation: ${
            responseData.error || response.statusText
          }`
        );
      }
    } else {
      console.info("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="fixed top-30 left-0 bg-[#1F2937] text-white p-6 shadow-lg rounded h-full w-200 overflow-y-auto z-30 flex flex-col">
      <div className="flex justify-end mb-4">
        <IoClose
          className="text-2xl text-gray-600 cursor-pointer"
          onClick={closeSidebar}
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {selectedStation.nom_station || "N/A"}
      </h2>
      <div className="mb-2 flex items-center">
        <FaMapMarkerAlt className="text-xl mr-2 text-gray-400" />
        <p className="text-lg">
          <strong>Adresse:</strong> {selectedStation.adresse_station || "N/A"}
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <FaClock className="text-xl mr-2 text-gray-400" />
        <p className="text-lg">
          <strong>Horaires:</strong> {selectedStation.horaires || "N/A"}
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <FaPhone className="text-xl mr-2 text-gray-400" />
        <p className="text-lg">
          <strong>Contact:</strong> {selectedStation.contact_operateur || "N/A"}
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <FaPhone className="text-xl mr-2 text-gray-400" />
        <p className="text-lg">
          <strong>Téléphone:</strong>{" "}
          {selectedStation.telephone_operateur || "N/A"}
        </p>
      </div>
      <div className="mb-2 flex items-center">
        <FaInfoCircle className="text-xl mr-2 text-gray-400" />
        <p className="text-lg">
          <strong>Conditions d'accès:</strong>{" "}
          {selectedStation.condition_acces || "N/A"}
        </p>
      </div>

      {selectedStation.reservation ? (
        <div className="flex flex-col items-center mt-auto mb-auto">
          <div className="text-white flex flex-col items-center h-[400px] w-full bg-[#1E1F24] rounded-lg p-6">
            <h1 className="w-full mb-4 text-lg text-center border border-[#444] rounded py-1">
              Réservez votre borne
            </h1>
            <div className="w-full mb-4">
              <h2 className="mb-2 text-sm">Date :</h2>
              <DatePicker onChange={handleDateChange} />
            </div>
            <div className="flex w-full gap-10 mb-10">
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-sm">Check In</h2>
                <TimePicker onChange={handleCheckInChange} />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-sm">Check Out</h2>
                <TimePicker onChange={handleCheckOutChange} />
              </div>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-black bg-[#7CD858] rounded font-semibold"
              onClick={handleReservation}
            >
              Charger maintenant !
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Cette borne n'est pas réservable.</p>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  selectedStation: PropTypes.shape({
    stationID: PropTypes.number.isRequired,
    nom_station: PropTypes.string,
    adresse_station: PropTypes.string,
    horaires: PropTypes.string,
    contact_operateur: PropTypes.string,
    telephone_operateur: PropTypes.string,
    condition_acces: PropTypes.string,
    reservation: PropTypes.bool,
  }).isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
