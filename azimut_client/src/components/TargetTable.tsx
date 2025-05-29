import "./TargetTable.css";
import { useState } from "react";
import { Target } from "@/types/target";
import { ThreatBadge } from "./ThreatBadge";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

type Props = {
  targets: Target[];
  onSelect: (target: Target) => void;
};

export const TargetTable = ({ targets, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (target: Target) => {
    setSelectedId(target.id);
    onSelect(target);
  };

  return (
    <div className="table-container">
      <table className="target-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Threat</th>
            <th>Updated</th>
          </tr>
        </thead>
      <tbody>
  {[...targets]
    .sort((a, b) => a.id - b.id)
    .map((t) => (
      <tr
        key={t.id}
        className={t.id === selectedId ? "selected" : ""}
        onClick={() => handleClick(t)}
      >
        <td>{t.id}</td>
        <td>{t.type}</td>
        <td><ThreatBadge level={t.threat_level} /></td>
        <td>{formatDistanceToNowStrict(parseISO(t.updated_at), { addSuffix: true })}</td>
      </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};
