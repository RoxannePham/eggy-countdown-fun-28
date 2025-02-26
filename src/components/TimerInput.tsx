
import React from "react";
import { Input } from "@/components/ui/input";

interface TimerInputProps {
  hours: number;
  minutes: number;
  seconds: number;
  onTimeChange: (field: "hours" | "minutes" | "seconds", value: number) => void;
}

const TimerInput: React.FC<TimerInputProps> = ({
  hours,
  minutes,
  seconds,
  onTimeChange,
}) => {
  const handleChange = (
    field: "hours" | "minutes" | "seconds",
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const maxValue = field === "hours" ? 99 : 59;
    onTimeChange(field, Math.min(Math.max(0, numValue), maxValue));
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className="flex flex-col items-center">
        <Input
          type="number"
          min="0"
          max="99"
          value={hours}
          onChange={(e) => handleChange("hours", e.target.value)}
          className="w-20 text-center bg-egg hover:bg-egg-hover transition-colors"
        />
        <span className="text-sm mt-1 text-gray-600">Hours</span>
      </div>
      <span className="text-4xl text-chick animate-bounce">:</span>
      <div className="flex flex-col items-center">
        <Input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => handleChange("minutes", e.target.value)}
          className="w-20 text-center bg-egg hover:bg-egg-hover transition-colors"
        />
        <span className="text-sm mt-1 text-gray-600">Minutes</span>
      </div>
      <span className="text-4xl text-chick animate-bounce">:</span>
      <div className="flex flex-col items-center">
        <Input
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={(e) => handleChange("seconds", e.target.value)}
          className="w-20 text-center bg-egg hover:bg-egg-hover transition-colors"
        />
        <span className="text-sm mt-1 text-gray-600">Seconds</span>
      </div>
    </div>
  );
};

export default TimerInput;
