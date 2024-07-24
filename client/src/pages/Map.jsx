import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { TbScanPosition } from "react-icons/tb";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import SearchBar from "../components/ SearchBar";
import Sidebar from "../components/Slidebar";

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
  const userMarker = useRef(null);

  const fetchStations = async (bbox) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stations?north=${bbox[3]}&south=${bbox[1]}&east=${bbox[2]}&west=${bbox[0]}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setStations(data);
      } else {
        console.error("Expected an array but got:", data);
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
          const color = station.reservation ? "blue" : "green";
          const marker = new mapboxgl.Marker({ color })
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
            zoom: 16,
            pitch: 45,
            bearing: -17.6,
            essential: true,
          });

          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          } else {
            userMarker.current = new mapboxgl.Marker({ color: "red" })
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          }
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
        style: "mapbox://styles/mapbox/navigation-night-v1",
        center: [4.891, 44.933],
        zoom: 16,
        pitch: 45,
        bearing: -17.6,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,
        flyTo: {
          zoom: 16,
          pitch: 45,
          bearing: -17.6,
        },
      });
      if (geocoderContainer.current) {
        geocoderContainer.current.innerHTML = "";
        geocoderContainer.current.appendChild(geocoder.onAdd(map.current));
      }

      geocoder.on("result", (e) => {
        map.current.flyTo({
          center: e.result.center,
          zoom: 16,
          pitch: 45,
          bearing: -17.6,
          essential: true,
        });
      });

      map.current.on("style.load", () => {
        map.current.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        });
      });

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
              zoom: 16,
              pitch: 45,
              bearing: -17.6,
              essential: true,
            });

            userMarker.current = new mapboxgl.Marker({ color: "red" })
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
        <SearchBar ref={geocoderContainer} />
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
        <Sidebar
          selectedStation={selectedStation}
          closeSidebar={closeSidebar}
        />
      )}
    </div>
  );
}

export default Map;
