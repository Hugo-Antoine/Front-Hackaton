"use client";

import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IconMapPin } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/axios/axios";

type PointOfInterest = {
  lat: number;
  long: number;
  visited: boolean;
};

export default function MapComponent() {
  const mapboxToken =
    "pk.eyJ1IjoiaHVnb2FudG9pbmUiLCJhIjoiY2x3NWJqenRvMWExNDJpcXNrNHlwM3YxdSJ9.vDBZpyfe_cX4IJ9uvXfQEg";

  const [userPosition, setUserPosition] = useState({
    lat: 6.4973,
    long: 2.6051,
  });

  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    []
  );
  const [route, setRoute] = useState(null);

  // [
  //   { lat: 6.46933, long: 2.62516, name: "Musée Honmé, Porto-Novo" },
  //   { lat: 6.3714, long: 2.4098, name: "Place de l'Étoile Rouge, Cotonou" },
  //   { lat: 6.359, long: 2.0901, name: "Musée d'Histoire de Ouidah, Ouidah" },
  // ]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch points of interest
  useEffect(() => {
    axiosInstance
      .get("/tourist_circuit/1/points")
      .then((response) => {
        setPointsOfInterest(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Calculate route
  useEffect(() => {
    if (pointsOfInterest.length === 0) return;

    const waypoints = [userPosition, ...pointsOfInterest]
      .map((poi) => `${poi.long},${poi.lat}`)
      .join(";");
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints}?geometries=geojson&access_token=${mapboxToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const routeLine = data.routes[0].geometry;
        setRoute(routeLine);
      })
      .catch((error) => console.log(error));
  }, [userPosition, pointsOfInterest]);

  return (
    <>
      {pointsOfInterest.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "18px",
            zIndex: 1,
          }}
        >
          Ask your companion for a personalised trip!
        </div>
      )}
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          latitude: userPosition.lat,
          longitude: userPosition.long,
          zoom: 8.5,
        }}
        style={{
          width: "100%",
          height: "100%",
          filter: `blur(${pointsOfInterest.length === 0 ? 10 : 0}px)`,
        }}
        maxZoom={20}
        minZoom={3}
      >
        <Marker latitude={userPosition.lat} longitude={userPosition.long}>
          <div style={{ color: "blue" }}>
            <IconMapPin size={30} />
          </div>
        </Marker>
        {pointsOfInterest.map((poi, index) => (
          <Marker key={index} latitude={poi.lat} longitude={poi.long}>
            <div
              style={{
                color: "red",
                filter: `grayscale(${poi.visited ? 1 : 0})`,
              }}
            >
              <IconMapPin size={30} />
            </div>
          </Marker>
        ))}
        {route && (
          <Source type="geojson" data={route}>
            <Layer
              type="line"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "green",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
    </>
  );
}
