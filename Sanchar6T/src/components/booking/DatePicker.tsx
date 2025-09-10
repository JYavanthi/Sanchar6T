import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = () => {
  const today = new Date();

  // Generate 7 days starting from startDate
  const getWeekDates = (startDate: Date, selectedDate: Date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      dates.push({
        day: days[d.getDay()],
        date: d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        }), // e.g. 08-Sep
        active: d.toDateString() === selectedDate.toDateString(), // highlight selected
        fullDate: d,
      });
    }
    return dates;
  };

  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today); // default is today
  const [dates, setDates] = useState(getWeekDates(today, today));

  // Handle navigation
  const handlePrev = () => {
    // Block going before today
    if (startDate <= today) return;

    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    setStartDate(newStart);
    setDates(getWeekDates(newStart, selectedDate));
  };

  const handleNext = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    setStartDate(newStart);
    setDates(getWeekDates(newStart, selectedDate));
  };

  // Handle selecting a date
  const handleSelectDate = (dateObj: any) => {
    setSelectedDate(dateObj.fullDate);
    setDates(getWeekDates(startDate, dateObj.fullDate));
  };

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left arrow */}
          <ChevronLeft
            className={`w-6 h-6 cursor-pointer ${
              startDate <= today ? "text-gray-300" : "text-gray-500"
            }`}
            onClick={handlePrev}
          />

          {/* Dates */}
          <div className="flex gap-1">
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleSelectDate(date)}
                className={`px-4 py-2 text-center cursor-pointer rounded ${
                  date.active
                    ? "bg-[#0b4d71] text-white"
                    : "text-[#555555] hover:bg-[#f2f2f2]"
                }`}
              >
                <div className="text-sm font-medium">{date.day}</div>
                <div className="text-sm">{date.date}</div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <ChevronRight
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
