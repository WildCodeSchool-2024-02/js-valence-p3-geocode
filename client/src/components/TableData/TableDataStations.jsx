import { useEffect, useState } from "react";

export default function Table() {
  const [dataStations, setDataStations] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const getAllStations = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/stations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch stations.");
        }

        const data = await response.json();
        setDataStations(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    getAllStations();
  }, []);

  const totalPages = Math.ceil(dataStations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = dataStations.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!dataStations.length) {
    return <p>Loading...</p>;
  }

  const filterCol = [
    "siren_amenageur",
    "contact_amenageur",
    "nom_operateur",
    "nom_station",
    "implantation_station",
    "adresse_station",
    "reservation",
  ];

  const headers = filterCol;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((station, index) => (
            <tr
              key={station.id} // Ensure this key is unique
              className={`${
                index % 2 === 0
                  ? "bg-gray-800 dark:bg-gray-900"
                  : "bg-gray-200 dark:bg-gray-700"
              } border-b dark:border-gray-700 hover:bg-gray-600`}
            >
              {filterCol.map((key, idx) => (
                <td key={idx} className="px-6 py-4">
                  {station[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages} | Total Stations:{" "}
          {dataStations.length}
        </span>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
