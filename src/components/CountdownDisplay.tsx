
import React from "react";
import { Egg, Clock } from "lucide-react";

interface CountdownDisplayProps {
  timeLeft: number;
  isRunning: boolean;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  timeLeft,
  isRunning,
}) => {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          {isRunning ? (
            <Egg
              className="w-8 h-8 text-egg animate-bounce"
              style={{ filter: "drop-shadow(0 0 8px rgba(254, 247, 205, 0.5))" }}
            />
          ) : (
            <Clock
              className="w-8 h-8 text-chick"
              style={{ filter: "drop-shadow(0 0 8px rgba(254, 198, 161, 0.5))" }}
            />
          )}
        </div>
      </div>
      <div className="text-6xl font-bold text-gray-700 tracking-wider">
        <span className="bg-egg px-4 py-2 rounded-lg">{formatNumber(hours)}</span>
        <span className="mx-2 text-chick">:</span>
        <span className="bg-egg px-4 py-2 rounded-lg">
          {formatNumber(minutes)}
        </span>
        <span className="mx-2 text-chick">:</span>
        <span className="bg-egg px-4 py-2 rounded-lg">
          {formatNumber(seconds)}
        </span>
      </div>
    </div>
  );
};

export default CountdownDisplay;
