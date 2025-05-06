import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  subMonths,
  addMonths,
  isSameDay
} from "date-fns";
import { useDate } from "../context/DateContext";
import formatDateToYYYYMMDD from "./DateFormat";

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { selectedDate, setSelectedDate } = useDate(null);

  const days = useMemo(() => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    let day = startDate;
    const daysArray = [];

    while (day <= endDate) {
      daysArray.push(day);
      day = addDays(day, 1);
    }

    return daysArray;
  }, [currentMonth]);

  const getDayClass = (date) => {
    if (isToday(date)) return "bg-[#1d4ed8] text-white rounded";
    if (selectedDate && isSameDay(date, selectedDate))
      return "bg-[#16a34a] text-white rounded";
    return "bg-gray-200 text-black rounded";
  };

  const handleDayClick = (date) => {
    setSelectedDate((prev) =>
      prev && isSameDay(new Date(prev), date)
        ? null
        : formatDateToYYYYMMDD(date)
    );
  };

  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center justify-between mb-3">
        <button
          className="p-2 text-black transition bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          ◀
        </button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          className="p-2 text-black transition bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          ▶
        </button>
      </div>
      <div className="grid flex-wrap grid-cols-7 gap-2">
        {days.map((date, index) => (
          <div
            key={index}
            className={`p-1 md:py-3 text-center cursor-pointer ${getDayClass(date)}`}
            onClick={() => handleDayClick(date)}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
