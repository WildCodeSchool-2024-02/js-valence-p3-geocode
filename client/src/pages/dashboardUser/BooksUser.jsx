import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../components/AuthContext";

Modal.setAppElement("#root");

function BooksUser() {
  const { auth } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBookingId(null);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/booking/user/${auth.userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setBookings(data.data);
        } else {
          console.error("Error fetching bookings:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookings();
  }, [auth]);

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:3310/api/booking/${selectedBookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBookingId)
        );
        closeModal();
      } else {
        const data = await response.json();
        console.error("Error canceling booking:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-4">Books Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Station ID</th>
              <th className="py-2 px-4 border-b border-gray-300">Date</th>
              <th className="py-2 px-4 border-b border-gray-300">Check In</th>
              <th className="py-2 px-4 border-b border-gray-300">Check Out</th>
              <th className="py-2 px-4 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {booking.stationID}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {booking.dateReservation}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {booking.checkIn}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {booking.checkOut}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => openModal(booking.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
          <p className="mb-4">Are you sure you want to cancel this booking?</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={closeModal}
            >
              No
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={handleCancelBooking}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BooksUser;
