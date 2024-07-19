import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { HiOutlineSearch } from "react-icons/hi";
import { SiLocal } from "react-icons/si";
import { TbScanPosition } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FsZWRndXptYW4iLCJhIjoiY2x5ZmpqZG9oMDA5bzJscjJmZDlyeGdwdCJ9.JeVpoEFj5YZvHxc9T017dA";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const geocoderContainer = useRef(null);
  const markers = useRef([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [stations, setStations] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const userLocation = useRef(null);

  const fetchStations = async (bbox) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/stations`,
        {
          params: {
            north: bbox[3],
            south: bbox[1],
            east: bbox[2],
            west: bbox[0],
          },
        }
      );
      if (Array.isArray(response.data)) {
        setStations(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const addMarkers = () => {
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    stations.forEach((station) => {
      if (station.consolidated_longitude && station.consolidated_latitude) {
        const longitude = Number(station.consolidated_longitude);
        const latitude = Number(station.consolidated_latitude);

        if (!Number.isNaN(longitude) && !Number.isNaN(latitude)) {
          const marker = new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);

          const markerElement = marker.getElement();
          markerElement.addEventListener("click", () => {
            setSelectedStation(station);
          });

          markers.current.push(marker);
        } else {
          console.error("Skipping invalid coordinates for station:", station);
        }
      } else {
        console.error("No coordinates found for station:", station);
      }
    });
  };

  const goToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.current = { latitude, longitude };
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            essential: true,
          });

          new mapboxgl.Marker({ color: "red" })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
        },
        {
          timeout: 10000,
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas supportée par ce navigateur."
      );
    }
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.3522, 48.8566],
        zoom: 11,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
      });
      if (geocoderContainer.current) {
        geocoderContainer.current.innerHTML = "";
        geocoderContainer.current.appendChild(geocoder.onAdd(map.current));
      }

      map.current.on("moveend", () => {
        const bounds = map.current.getBounds();
        const bbox = [
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ];
        fetchStations(bbox);
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            userLocation.current = { latitude, longitude };
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 11,
              essential: true,
            });

            new mapboxgl.Marker({ color: "red" })
              .setLngLat([longitude, latitude])
              .addTo(map.current);

            setLoadingLocation(false);
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error);
            setLoadingLocation(false);
          },
          {
            timeout: 10000,
          }
        );
      } else {
        console.error(
          "La géolocalisation n'est pas supportée par ce navigateur."
        );
        setLoadingLocation(false);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (stations.length > 0 && map.current) {
      addMarkers();
    }
  }, [stations]);

  const closeSidebar = () => {
    setSelectedStation(null);
  };

  return (
    <div className="map-page flex h-screen mt-28">
      <div className="w-full h-full relative">
        <div
          ref={geocoderContainer}
          className="absolute top-4 left-4 z-10 flex items-center"
        >
          <div className="w-96 relative flex items-center bg-white p-2 rounded shadow-md">
            <input
              type="text"
              className="w-full px-2 py-1 text-gray-800"
              placeholder="Chercher"
              style={{ marginRight: "25px" }}
            />
            <HiOutlineSearch
              className="text-2xl text-gray-600"
              style={{ position: "absolute", right: "32px" }}
            />
            <SiLocal
              className="text-2xl text-blue-500 cursor-pointer"
              style={{ position: "absolute", right: "0px" }}
            />
          </div>
        </div>
        <div ref={mapContainer} className="w-full h-full z-0" />
        <TbScanPosition
          className="fixed bottom-4 right-4 text-4xl text-red-500 cursor-pointer z-20"
          onClick={goToUserLocation}
        />
      </div>
      {loadingLocation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-30">
          <div className="text-2xl font-bold">
            Chargement de la localisation...
          </div>
        </div>
      )}
      {selectedStation && (
        <div className="fixed top-0 left-0 bg-white p-4 shadow-lg rounded h-full w-1/4 overflow-y-auto z-30">
          <div className="flex justify-end">
            <IoClose
              className="text-2xl text-gray-600 cursor-pointer"
              onClick={closeSidebar}
            />
          </div>
          <h2 className="text-xl font-bold">{selectedStation.nom_station}</h2>
          <p>{selectedStation.adresse_station}</p>
          <p>{selectedStation.horaires}</p>
          <p>{selectedStation.contact_operateur}</p>
          <p>{selectedStation.telephone_operateur}</p>
          <p>{selectedStation.condition_acces}</p>
        </div>
      )}
    </div>
  );
}

export default Map;
