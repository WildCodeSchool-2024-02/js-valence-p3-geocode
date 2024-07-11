import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { number } from "prop-types";
import chargingStations from "../constant/chargingStations.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FsZWRndXptYW4iLCJhIjoiY2x5ZmpqZG9oMDA5bzJscjJmZDlyeGdwdCJ9.JeVpoEFj5YZvHxc9T017dA";

const customMarkerIconURL =
  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";

export default function Map() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/kaledguzman/clyfl3k6700se01nwd9wo7kvo",
      center: [2.3522, 48.8566],
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
      animationMode: "flyTo",
      animationDuration: 6000,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      map.loadImage(customMarkerIconURL, (error, image) => {
        if (error) throw error;
        map.addImage("custom-marker", image);

        map.addLayer({
          id: "markers",
          type: "symbol",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: chargingStations.map((station) => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: station.geo_point_borne
                    .split(",")
                    .map(Number)
                    .reverse(),
                },
                properties: {
                  title: station.n_station,
                  description: `${station.Adresse}<br>${station.Ville}`,
                },
              })),
            },
          },
          layout: {
            "icon-image": "custom-marker",
            "icon-size": 0.5,
            "text-field": ["get", "title"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        });

        // Add popups
        map.on("click", "markers", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { title, description } = e.features[0].properties;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`<h3>${title}</h3><p>${description}</p>`)
            .addTo(map);
        });

        map.on("mouseenter", "markers", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "markers", () => {
          map.getCanvas().style.cursor = "";
        });
      });
    });

    return () => map.remove();
  }, []);

  const flyToMarker = (longitude, latitude) => {
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
      bearing: 0,
      speed: 2,
      curve: 1,
      easing: (t) => t,
    });
  };

  return (
    <div className="relative h-screen flex">
      <div ref={mapContainer} className="w-4/6 h-full" />
      <div className="w-2/6 h-full pt-[120px] bg-gray-800 text-white p-4 overflow-auto">
        <h1 className="text-2xl mb-4">Search Filters</h1>
        {chargingStations.map((station) => {
          const [latitude, longitude] = station.geo_point_borne
            .split(",")
            .map(Number);
          return (
            <div key={number} className="mb-4">
              <h3 className="text-xl">{station.n_station}</h3>
              <p>
                {station.Adresse}
                <br />
                {station.Ville}
              </p>
              <button
                type="button"
                onClick={() => flyToMarker(longitude, latitude)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Go to Marker
              </button>
            </div>
          );
        })}
        <div>
          <label
            htmlFor="filter1"
            className="block text-sm font-medium text-gray-400"
          >
            Filter 1
          </label>
          <input
            id="filter1"
            type="text"
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="filter2"
            className="block text-sm font-medium text-gray-400"
          >
            Filter 2
          </label>
          <input
            id="filter2"
            type="text"
            className="mt-1 block w-full p-2 bg-gray-700 text-white rounded-md border-gray-600 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
