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
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [reservationData, setReservationData] = useState({
    dateReservation: null,
    checkIn: null,
    checkOut: null,
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vehicles/${auth.userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setVehicles(result.data);
        } else {
          console.error("Error fetching vehicles:", result);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, [auth.token, auth.userId]);

  const fetchReservedTimes = async (date) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reservations?stationId=${selectedStation.stationID}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setReservedTimes(result.data);
      } else {
        console.error("Error fetching reserved times:", result);
      }
    } catch (error) {
      console.error("Error fetching reserved times:", error);
    }
  };

  const handleVehicleChange = (event) => {
    const vehicleId = event.target.value;
    const vehicle = vehicles.find((v) => v.id === parseInt(vehicleId, 10));
    setSelectedVehicle(vehicle);
  };

  const handleDateChange = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    setReservationData({
      ...reservationData,
      dateReservation: new Date(date),
    });
    fetchReservedTimes(formattedDate);
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
      selectedStation.stationID &&
      selectedVehicle
    ) {
      const createAt = new Date().toISOString().split("T")[0];
      const dateReservation = reservationData.dateReservation
        .toISOString()
        .split("T")[0];
      const { checkIn, checkOut } = reservationData;

      const reservationDetails = {
        stationID: selectedStation.stationID,
        createAt,
        dateReservation,
        checkIn,
        checkOut,
        userID: Number(auth.userId),
        vehicleID: selectedVehicle.id,
      };

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

        if (response.ok) {
          toast.success("Réservation réussie !", { autoClose: 5000 });
          setTimeout(() => closeSidebar(), 4000);
        } else {
          toast.error(`Erreur: ${responseData.error || response.statusText}`, {
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Erreur lors de la réservation. Veuillez réessayer.", {
          autoClose: 5000,
        });
      }
    } else {
      toast.warn("Veuillez remplir tous les champs.", { autoClose: 5000 });
    }
  };

  const calculateInterval = () => {
    if (selectedVehicle && selectedStation) {
      const vehiclePower = selectedVehicle.power_charge;
      const stationPower = selectedStation.puissance_nominale;
      const batteryCapacity = selectedVehicle.battery_capacity;

      const estimatedChargingTime =
        batteryCapacity / Math.min(vehiclePower, stationPower);

      if (estimatedChargingTime <= 1) {
        return 15;
      }
      if (estimatedChargingTime <= 3) {
        return 30;
      }
      return 60;
    }
    return 30;
  };
  const timeIntervals = calculateInterval();

  return (
    <div className="fixed top-30 left-0 bg-[#1F2937] text-white p-6 shadow-lg rounded h-full w-200 overflow-y-auto z-30 flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={4000}
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
        <FaInfoCircle className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Conditions d'accès:</strong>{" "}
          {selectedStation.condition_acces || "N/A"}
        </p>
      </div>
      <div className="flex items-center mb-2">
        <FaPhone className="mr-2 text-xl text-gray-400" />
        <p className="text-lg">
          <strong>Puissance:</strong>{" "}
          {selectedStation.puissance_nominale || "N/A"}
        </p>
      </div>

      {selectedStation.reservation ? (
        <div className="flex flex-col items-center mt-auto mb-auto">
          <div className="text-white flex flex-col items-center h-[400px] w-full bg-[#1E1F24] rounded-lg p-6">
            <h1 className="w-full mb-4 text-lg text-center border border-[#444] rounded py-1">
              Réservez votre borne
            </h1>
            <div className="w-full mb-4">
              <h2 className="mb-2 text-sm">Véhicule :</h2>
              <select
                onChange={handleVehicleChange}
                className="w-full mb-4 p-2 bg-white text-black rounded"
              >
                <option value="">Sélectionnez un véhicule</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} (Modèle: {vehicle.model})
                  </option>
                ))}
              </select>
              {selectedVehicle && (
                <div className="mt-2">
                  <p>Puissance: {selectedVehicle.power_charge} kW</p>
                </div>
              )}
            </div>
            <div className="w-full mb-4">
              <h2 className="mb-2 text-sm">Date :</h2>
              <DatePicker onChange={handleDateChange} />
            </div>
            <div className="flex w-full gap-10 mb-10">
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-sm">Check In</h2>
                <TimePicker
                  onChange={handleCheckInChange}
                  interval={timeIntervals}
                  reservedTimes={reservedTimes}
                />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-sm">Check Out</h2>
                <TimePicker
                  onChange={handleCheckOutChange}
                  interval={timeIntervals}
                  reservedTimes={reservedTimes}
                />
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
    puissance_nominale: PropTypes.number,
  }).isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
