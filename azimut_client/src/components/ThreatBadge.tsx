import { threatColors } from "../constants/threatColors";
import "./ThreatBadge.css";

type Props = {
  level: string;
};

export const ThreatBadge = ({ level }: Props) => {
  const color = threatColors[level] ?? threatColors.default;

  

  return (
    <span className="badge" style={{ backgroundColor: color }}>
      {level}
    </span>
  );
};
