import { useEffect, useState } from "react";
import { Target } from "@/types/target";
import { TargetTable } from "./TargetTable";
import { API_URLS } from "../constants/api";
import  TargetsMap  from "./MapView";

export const TargetsDashboard = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);

  // Initial fetch from /targets
  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const res = await fetch(API_URLS.targets);
        const data = await res.json();
        setTargets(data);
      } catch (err) {
        console.error("Erreur chargement initial :", err);
      }
    };
    fetchTargets();
  }, []);

  // WebSocket live updates
  useEffect(() => {
    const ws = new WebSocket(API_URLS.stream);

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (event) => {
      try {
        const { updated_targets } = JSON.parse(event.data);
        setTargets((prev) =>
          prev.map((t) => updated_targets.find((u: Target) => u.id === t.id) ?? t)
        );
      } catch (err) {
        console.error("Erreur WebSocket :", err);
      }
    };
    ws.onerror = (e) => console.error("❌ WebSocket error:", e);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  return (
     <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "50%", overflowY: "scroll", borderRight: "1px solid #ccc" }}>
        <TargetTable targets={targets} onSelect={setSelectedTarget}  />
      </div>
      <div style={{ width: "50%" }}>
       
      </div>
    </div>
  );
};
