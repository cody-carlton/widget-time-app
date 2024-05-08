import React, { useState, useEffect } from "react";

export default function TimeUpdater() {
  const [time, setTime] = useState("");
  const [percent, setPercent] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const [months, setMonth] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  useEffect(() => {
    const d = new Date();
    const day = dayOfWeek[d.getDay()];
    const month = months[d.getMonth()];
    setMonth(month);
    setDayOfWeek(day);
  }, []);

  useEffect(() => {
    const update = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours() - 8;
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const totalMinutes = (hours * 60 + minutes) * 60 + seconds;
      setTime(
        currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          seconds: "2-digit",
        })
      );
      setPercent(((totalMinutes / (540 * 60)) * 100).toFixed(3) + "%");
    };

    update();

    const interval = setInterval(update, 1000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="bottom">
        <div className="time-updater">
          <div className="time-container">
            <div>
              {dayOfWeek}
              {months}
            </div>
            <p>{time}</p>
          </div>

          <div className="percentage-container">
            <p>{percent}</p>
          </div>
          <button type="button" onClick={() => window.location.reload()}>
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
}
