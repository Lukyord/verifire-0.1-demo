"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string; // A string representing the target date and time in "YYYY-MM-DDTHH:mm" format (e.g. "2023-05-01T12:00")
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = new Date(targetDate).getTime() - new Date().getTime();

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setRemainingTime({ days, hours, minutes });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-sm">
      {remainingTime.hours < 0 ? (
        <p className="mr-2">Right about now...</p>
      ) : (
        <>
          <p>{remainingTime.days > 0 ? remainingTime.days : "0"} days</p>
          <p>{remainingTime.hours} hrs</p>
        </>
      )}
    </div>
  );
};

export default Countdown;
