/*

Define Target type
*/


export type Target = {
  id: number;
  lat: number;
  lon: number;
  type: string;
 threat_level: "safe" | "suspect" | "dangerous" | "distress" | string;
  updated_at: string;
};
