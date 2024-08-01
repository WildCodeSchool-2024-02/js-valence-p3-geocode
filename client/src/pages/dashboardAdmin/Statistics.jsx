import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
export default function Statistics() {
  const [totalCars, setTotalCars] = useState(0);
  const [carModels, setCarModels] = useState([]);
  const [carColors, setCarColors] = useState([]);
  const [priceTypes, setPriceTypes] = useState([]);
  const [modelDistribution, setModelDistribution] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCars = await fetch("http://localhost:3310/api/vehicles");
        const dataCars = await responseCars.json();
        setTotalCars(dataCars.data.length);
        const models = dataCars.data.reduce((acc, car) => {
          acc[car.model] = (acc[car.model] || 0) + 1;
          return acc;
        }, {});
        setCarModels(
          Object.entries(models).map(([model, count]) => ({ model, count }))
        );
        const colors = dataCars.data.reduce((acc, car) => {
          acc[car.color] = (acc[car.color] || 0) + 1;
          return acc;
        }, {});
        setCarColors(
          Object.entries(colors).map(([color, count]) => ({ color, count }))
        );
        const prices = dataCars.data.reduce((acc, car) => {
          acc[car.priceType] = (acc[car.priceType] || 0) + 1;
          return acc;
        }, {});
        setPriceTypes(
          Object.entries(prices).map(([priceType, count]) => ({
            priceType,
            count,
          }))
        );
        setModelDistribution(
          Object.entries(models).map(([model, count]) => ({ model, count }))
        );
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);
  const totalCarsData = {
    labels: ["Total Cars"],
    datasets: [
      {
        data: [totalCars],
        backgroundColor: "rgba(135, 206, 250, 0.5)",
        borderColor: "rgba(135, 206, 250, 1)",
        borderWidth: 1,
      },
    ],
  };
  const carModelsData = {
    labels: carModels.map((model) => model.model),
    datasets: [
      {
        label: "Number of Cars by Model",
        data: carModels.map((model) => model.count),
        backgroundColor: carModels.map(
          (_, i) => `rgba(${(i * 100) % 255}, ${(i * 150) % 255}, 200, 0.5)`
        ),
        borderColor: carModels.map(
          (_, i) => `rgba(${(i * 100) % 255}, ${(i * 150) % 255}, 200, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };
  const modelDistributionData = {
    labels: modelDistribution.map((model) => model.model),
    datasets: [
      {
        label: "Car Model Distribution",
        data: modelDistribution.map((model) => model.count),
        backgroundColor: modelDistribution.map(
          (_, i) =>
            `rgba(${(i * 120) % 255}, ${(i * 100) % 255}, ${(i * 180) % 255}, 0.5)`
        ),
        borderColor: modelDistribution.map(
          (_, i) =>
            `rgba(${(i * 120) % 255}, ${(i * 100) % 255}, ${(i * 180) % 255}, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col items-center max-h-screen overflow-hidden text-white bg-gray-900">
      <h1 className="m-10 text-3xl">Cars Statistics</h1>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="w-full max-w-sm">
          <Bar
            data={totalCarsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="w-full max-w-sm">
          <Pie
            data={carModelsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full max-w-sm mt-20">
          <Bar
            data={carModelsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <div className="w-full max-w-sm mt-20">
          <Bar
            data={modelDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) =>
                      `${tooltipItem.label}: ${tooltipItem.raw}`,
                  },
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                },
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
