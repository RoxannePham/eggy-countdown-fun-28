
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import TimerInput from "@/components/TimerInput";
import CountdownDisplay from "@/components/CountdownDisplay";
import { Play, Pause, RotateCcw } from "lucide-react";

const Index = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleTimeChange = (
    field: "hours" | "minutes" | "seconds",
    value: number
  ) => {
    switch (field) {
      case "hours":
        setHours(value);
        break;
      case "minutes":
        setMinutes(value);
        break;
      case "seconds":
        setSeconds(value);
        break;
    }
  };

  const startTimer = useCallback(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    } else {
      toast({
        title: "Oops!",
        description: "Please set a time greater than zero.",
        variant: "destructive",
      });
    }
  }, [hours, minutes, seconds, toast]);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      startTimer();
    } else {
      setIsRunning(!isRunning);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            toast({
              title: "Time's up!",
              description: "Your countdown has finished.",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, toast]);

  return (
    <div className="min-h-screen bg-sky flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
          Egg Timer
        </h1>

        {timeLeft === 0 ? (
          <TimerInput
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            onTimeChange={handleTimeChange}
          />
        ) : (
          <CountdownDisplay timeLeft={timeLeft} isRunning={isRunning} />
        )}

        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={toggleTimer}
            className="bg-chick hover:bg-chick-hover text-white"
          >
            {isRunning ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            className="border-chick text-chick hover:bg-chick/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
