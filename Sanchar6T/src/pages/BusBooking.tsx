


import { useEffect, useState } from "react";
import SearchForm from "@/components/booking/SearchForm";
import DatePicker from "@/components/booking/DatePicker";
import TimelineHeader from "@/components/booking/TimelineHeader";
import BusListing from "@/components/booking/BusListing";
import BookingLabel from "@/components/booking/BookingLabel";
import StickyForm from "@/components/booking/StickyForm"; // 👈 import StickyForm

const BusBooking = () => {
  // Keep your existing hardcoded data as fallback
  const hardcodedBusData = [
    {
      busNumber: "Bng to Tpt Extra",
      operator: "Via",
      busType: "Leyland Luxura Sleeper, AC,",
      departureTime: "08:00 PM",
      arrivalTime: "03:00 AM",
      duration: "07:00 Hrs", // ✅ hardcoded
      date: "Thu, 04 Sep",
      price: "₹ 1364/-",
      seatsAvailable: 0,
      totalSeats: 36,
      amenities: ["AC", "Video"],
      isVia: true,
      viaStops: 1,
    },
    // ... rest of your existing hardcoded buses
  ];

  const [busData, setBusData] = useState(hardcodedBusData);
  const [loading, setLoading] = useState(true);

  // ✅ Utility function to calculate duration
  const calculateDuration = (departure: string, arrival: string) => {
    const dep = new Date(departure);
    const arr = new Date(arrival);

    if (isNaN(dep.getTime()) || isNaN(arr.getTime())) return "—";

    let diffMs = arr.getTime() - dep.getTime();

    // If arrival is on next day (after midnight)
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} Hrs`;
  };

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bus-details"); // your Node.js API
        const data = await res.json();

        // Map DB data to the structure your BusListing component expects
        const mappedData = data.map((bus: any) => {
          const depTime = new Date(bus.DepartureTime);
          const arrTime = new Date(bus.Arrivaltime);

          return {
            busNumber: bus.PackageName,
            operator: bus.OperatorID,
            busType: bus.BusType,
            departureTime: depTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            arrivalTime: arrTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            duration: calculateDuration(bus.DepartureTime, bus.Arrivaltime), // ✅ Auto duration
            date: depTime.toLocaleDateString(),
            price: `₹ ${bus.WkEndSeatPrice}/-`,
            seatsAvailable: bus.BusSeats - (bus.FilledSeats || 0), // adjust if you have booked seats info
            totalSeats: bus.BusSeats,
            amenities: bus.amenities || [], // ✅ use backend amenities array safely
            hasInfo: true,
            isVia: bus.ViaStops > 0,
            viaStops: bus.ViaStops || 0,
            boardingPoints: bus.BoardingPoints?.split(",") || [],
          };
        });

        setBusData(mappedData);
        setLoading(false);
        console.log("Bus data from API:", mappedData); // log values in console
      } catch (err) {
        console.error("Error fetching bus data:", err);
        setLoading(false);
      }
    };

    fetchBusData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      {/* Top search form */}
      <SearchForm />

      {/* Date picker */}
      <DatePicker />

      {/* Timeline */}
      <TimelineHeader />

      {/* Bus listings */}
      <div className="bg-[#ffffff]">
        {loading
          ? hardcodedBusData.map((bus, index) => (
              <BusListing key={index} {...bus} />
            ))
          : busData.map((bus, index) => <BusListing key={index} {...bus} />)}
      </div>

      {/* Footer label */}
      <div className="bg-[#1976d2] text-white text-center py-4 text-sm font-medium">
        <BookingLabel />
      </div>

      {/* Sticky form button + slide panel */}
      <StickyForm /> {/* 👈 this will stick on right side */}
    </div>
  );
};

export default BusBooking;
