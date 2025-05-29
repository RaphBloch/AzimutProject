import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, Map  } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getThreatIcon } from "./ThreatIcon";
import { Target } from "../types/target";



type Props = {
  targets: Target[];
  selectedTarget: Target | null;
};

/**
 * 
 * @param {lat , lon} 
 * The map will be centered with a zoom on the selected target coordinates
 * 
 */
const PanToSelected = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10); // You can adjust the zoom level
  }, [lat, lon, map]);
  return null;
};

export default function TargetsMap({ targets, selectedTarget }: Props) {
  
  const initialCenter: LatLngExpression = [30, 30]; // Adjust if needed (center of the coordinates populated in the DB)



  return (
    <MapContainer
      center={initialCenter}
      zoom={7}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {targets.map((target) => (
        <Marker
          key={target.id}
          position={[target.lat, target.lon]}
          icon={
            getThreatIcon(target.threat_level)
          }
        >
          <Popup>
            <strong>ID:</strong> {target.id}
            <br />
            <strong>Type:</strong> {target.type}
            <br />
            <strong>Threat:</strong> {target.threat_level}
          </Popup>
        </Marker>
      ))}

      {selectedTarget && <PanToSelected lat={selectedTarget.lat} lon={selectedTarget.lon} />}
    </MapContainer>
  );
}
