import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { FaMapMarkerAlt, FaClock, FaPhone, FaInfoCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, TimePicker } from "./index";
import { AuthContext } from "./AuthContext";
import "react-toastify/dist/ReactToastify.css";

function Sidebar({ selectedStation, closeSidebar }) {
  const { auth } = useContext(AuthContext);
  const [reservationData, setReservationData] = useState({
    dateReservation: null,
    checkIn: null,
    checkOut: null,
  });

  useEffect(() => {
    console.info("Selected Station data:", selectedStation);
  }, [selectedStation]);

  const handleDateChange = (date) => {
    console.info("Date selected:", date);
    setReservationData({
      ...reservationData,
      dateReservation: new Date(date),
    });
  };

  const handleCheckInChange = (time) => {
    console.info("Check-in time selected:", time);
    setReservationData({ ...reservationData, checkIn: time });
  };

  const handleCheckOutChange = (time) => {
    console.info("Check-out time selected:", time);
    setReservationData({ ...reservationData, checkOut: time });
  };

  const handleReservation = async () => {
    console.info("handleReservation called");
    console.info("Reservation data:", reservationData);
    console.info("Auth data:", auth);

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
        userID: Number(auth.userId),
      };

      console.info("Reservation Details:", reservationDetails);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/booking`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(reservationDetails),
          }
        );

        const responseData = await response.json();
        console.info("Response Data:", responseData);

        if (response.ok) {
          console.info("Réservation réussie");
          toast.success("Réservation réussie !");
          closeSidebar();
        } else {
          console.error("Erreur lors de la réservation:", responseData);
          toast.error(`Erreur: ${responseData.error || response.statusText}`);
        }
      } catch (error) {
        console.error("Erreur lors de la réservation:", error);
        toast.error("Erreur lors de la réservation. Veuillez réessayer.");
      }
    } else {
      console.info("Veuillez remplir tous les champs");
      toast.warn("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="fixed top-30 left-0 bg-[#1F2937] text-white p-6 shadow-lg rounded h-full w-200 overflow-y-auto z-30 flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ zIndex: 9999 }}
      />
      <div className="flex justify-end mb-4">
        <IoClose
          className="text-2xl text-gray-600 cursor-pointer"
          onClick={closeSidebar}
        />
      </div>
      <h2 className="mb-2 text-2xl font-bold">
        {selectedStation.nom_station || "N/A"}
      </h2>
      <div className="flex items-center mb-2">
        <FaMapMarkerAlt className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Adresse:</strong> {selectedStation.adresse_station || "N/A"}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaClock className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Horaires:</strong> {selectedStation.horaires || "N/A"}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaPhone className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Contact:</strong> {selectedStation.contact_operateur || "N/A"}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaPhone className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Téléphone:</strong>{" "}
          {selectedStation.telephone_operateur || "N/A"}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaInfoCircle className="mr-2 text-xl text-gray-400" />
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
        <p className="mt-4 text-red-500">Cette borne n'est pas réservable.</p>
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
