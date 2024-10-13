import './card.css'
interface AnimatedCardProps {
  problemId: string;
  code: string;
  language: string;
}

import React from "react";
import { Button } from "./button";

interface AnimatedCardProps {
  title: string;
  code: string;
  language: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  code,
  language,
}) => {
  return (
    <div className="w-64 deck-item h-64 p-6 rounded-xl shadow-lg text-white ">
      <h3 className="text-xl font-semibold mb-2 truncate">Problem: {title}</h3>
      <div className="h-40 overflow-y-auto">
        <p className="text-sm">{code}</p>
      </div>
    </div>
  );
};

export default AnimatedCard;
