import { useState } from "react";

const carData = [
  {
    id: 1,
    name: "Bentley Flying Spur",
    style: "Bentley",
    type: "Auto",
    color: "Blue",
    price: "$285,892",
    img: "/path-to-image-bentley.jpg",
    user: {
      name: "Matthew Jones",
      email: "matthewj@gmail.com",
      start: "Georgia.bilis, 14",
      stop: "103 Saint Laurence, UK",
      finish: "103 Chicago",
      distance: "48 KM",
      time: "2h 18m",
      speed: "70km/h",
      fuel: "12 Liters",
      people: "4 Person",
      condition: "Average",
      rental: "$3,584.71",
    },
  },
  {
    id: 2,
    name: "Lamborghini Autofill",
    style: "Audi",
    type: "Auto",
    color: "Green",
    price: "$285,892",
    img: "/path-to-image-lamborghini.jpg",
    user: {
      name: "Andrew Smith",
      email: "andrewsmith@gmail.com",
      start: "Location A",
      stop: "Location B",
      finish: "Location C",
      distance: "60 KM",
      time: "1h 45m",
      speed: "80km/h",
      fuel: "15 Liters",
      people: "2 Person",
      condition: "Good",
      rental: "$4,200.50",
    },
  },
  {
    id: 3,
    name: "Audi's R8 White",
    style: "Audi",
    type: "Auto",
    color: "White",
    price: "$285,892",
    img: "/path-to-image-audi.jpg",
    user: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      start: "Location X",
      stop: "Location Y",
      finish: "Location Z",
      distance: "50 KM",
      time: "2h 0m",
      speed: "75km/h",
      fuel: "10 Liters",
      people: "3 Person",
      condition: "Excellent",
      rental: "$3,700.00",
    },
  },
  {
    id: 4,
    name: "Bentley Motors GT",
    style: "Bentley",
    type: "Auto",
    color: "Gray",
    price: "$285,892",
    img: "/path-to-image-bentley-gt.jpg",
    user: {
      name: "Alice Cooper",
      email: "alicecooper@gmail.com",
      start: "Start Point A",
      stop: "Stop Point B",
      finish: "Finish Point C",
      distance: "55 KM",
      time: "2h 30m",
      speed: "65km/h",
      fuel: "13 Liters",
      people: "5 Person",
      condition: "Good",
      rental: "$3,800.00",
    },
  },
];

function CarsUser() {
  const [selectedCar, setSelectedCar] = useState(carData[0]);

  return (
    <div className="bg-[#2D2D37] rounded-lg p-8">
      <h2 className="text-xl font-bold text-white mb-4">Available Cars</h2>
      <div className="flex">
        <div className="flex-1 grid grid-cols-2 gap-4">
          {carData.map((car) => (
            <div
              key={car.id}
              className="bg-[#1C1C24] p-4 rounded-lg cursor-pointer"
              onClick={() => setSelectedCar(car)}
              role="button"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedCar(car);
                }
              }}
            >
              <img
                src={car.img}
                alt={car.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-white font-semibold">{car.name}</h3>
              <p className="text-gray-400">Style: {car.style}</p>
              <p className="text-gray-400">Type: {car.type}</p>
              <p className="text-gray-400">Color: {car.color}</p>
              <p className="text-[#4ADE80] font-bold">{car.price}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-[#1C1C24] p-4 rounded-lg ml-4">
          <h3 className="text-white font-semibold mb-4">Car Info</h3>
          <div className="flex items-center mb-4">
            <img
              src={selectedCar.img}
              alt={selectedCar.name}
              className="w-1/3 h-48 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-white font-semibold">{selectedCar.name}</h3>
              <p className="text-gray-400">Style: {selectedCar.style}</p>
              <p className="text-gray-400">Type: {selectedCar.type}</p>
              <p className="text-gray-400">Color: {selectedCar.color}</p>
              <p className="text-[#4ADE80] font-bold">{selectedCar.price}</p>
            </div>
          </div>
          <h3 className="text-white font-semibold mb-4">User Info</h3>
          <div className="grid grid-cols-3 gap-4 text-gray-400">
            <div>
              <p>
                <strong>Name:</strong> {selectedCar.user.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedCar.user.email}
              </p>
              <p>
                <strong>Start Point:</strong> {selectedCar.user.start}
              </p>
            </div>
            <div>
              <p>
                <strong>Stop Point:</strong> {selectedCar.user.stop}
              </p>
              <p>
                <strong>Finish Point:</strong> {selectedCar.user.finish}
              </p>
              <p>
                <strong>Total Distance:</strong> {selectedCar.user.distance}
              </p>
            </div>
            <div>
              <p>
                <strong>Time Traveled:</strong> {selectedCar.user.time}
              </p>
              <p>
                <strong>Speed:</strong> {selectedCar.user.speed}
              </p>
              <p>
                <strong>Fuel:</strong> {selectedCar.user.fuel}
              </p>
              <p>
                <strong>People Used:</strong> {selectedCar.user.people}
              </p>
              <p>
                <strong>Condition:</strong> {selectedCar.user.condition}
              </p>
              <p>
                <strong>Rental:</strong> {selectedCar.user.rental}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsUser;
