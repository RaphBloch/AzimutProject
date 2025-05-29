/**
 * Mapping of threat levels to their corresponding color codes.
 * 
 * Used for UI color indicators such as badges or markers.
 */
export const threatColors: Record<string, string> = {
  safe: "#38a169",        // green
  suspect: "#d69e2e",     // yellow
  dangerous: "#e53e3e",   // red
  distress: "#c53030",    // dark red
  default: "#718096",     // gray
};
