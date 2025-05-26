import React, { useEffect, useState } from "react";

type Target = {
  id: number;
  lat: number;
  lon: number;
  type: string;
  threat_level: string;
  updated_at: string;
};

const API_URL = "http://127.0.0.1:8000/targets";
const WS_URL = "ws://127.0.0.1:8000/stream";

const TargetsMap: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);

  // Initial fetch
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTargets(data))
      .catch((err) => console.error("Erreur chargement initial :", err));
  }, []);

  //  WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const updated: Target[] = data.updated_targets;

      // Met à jour les targets dans le state
      setTargets((prev) =>
        prev.map((t) =>
          updated.find((u) => u.id === t.id) ?? t
        )
      );
    };

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onerror = (e) => console.error("❌ WebSocket erro :", e);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2>🗺 Targets actifs ({targets.length})</h2>
      <ul>
        {targets.map((t) => (
          <li key={t.id}>
            #{t.id} - {t.type} - [{t.lat.toFixed(2)}, {t.lon.toFixed(2)}] - <strong>{t.threat_level}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetsMap;
