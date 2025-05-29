import { threatColors } from "../constants/threatColors";
import L from "leaflet";


/**
 * 
 * @param threat_level 
 * @returns an Icon with the svg colored according to the level of threat
 */
export function getThreatIcon(threat_level: string): L.DivIcon {
  const color = threatColors[threat_level] || threatColors.default;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
      <path d="M16 0C7 0 0 7 0 16c0 12 16 32 16 32s16-20 16-32C32 7 25 0 16 0z"
            fill="${color}" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `;

  return L.divIcon({
    className: "",
    html: svg,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -40],
  });
}
