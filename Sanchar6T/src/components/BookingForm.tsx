

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowUpDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Carousel images
const womenImages = [
  "https://st.redbus.in/Images/INDOFFER/women/women1.svg",
  "https://st.redbus.in/Images/INDOFFER/women/women2.svg",
  "https://st.redbus.in/Images/INDOFFER/women/women3.svg",
];

// Tab images from assets
import busImg from "@/assets/bus.png";
import cabImg from "@/assets/car.png";
import hotelImg from "@/assets/hotel.png";
import offerImg from "@/assets/special-offers.png";

// Women image
import womenImg from "@/assets/women.png";




const BookingForm = () => {
  const [activeTab, setActiveTab] = useState("BUSES");
  const [womenOnly, setWomenOnly] = useState(false);

  // Booking states
  const [departure, setDeparture] = useState("BENGALURU");
  const [destination, setDestination] = useState("TIRUPATI");
  const [leaving, setLeaving] = useState("2025-03-15");
  const [passengers, setPassengers] = useState(1);

  // Popup & carousel state
  const [showPopup, setShowPopup] = useState(false);
  const [current, setCurrent] = useState(0);

  // Auto slide when popup open
  useEffect(() => {
    if (showPopup) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % womenImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showPopup]);

  // Tabs config with images
  const tabs = [
    { id: "BUSES", img: busImg, label: "BUSES" },
    { id: "CABS", img: cabImg, label: "CABS" },
    { id: "HOTELS", img: hotelImg, label: "HOTELS" },
    { id: "SPECIAL_OFFERS", img: offerImg, label: "SPECIAL OFFERS" },
  ];

  const swapLocations = () => {
    setDeparture(destination);
    setDestination(departure);
  };

  const navigate = useNavigate();
  return (
    <div className="relative -mt-20 z-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 flex flex-col gap-6">
          {/* Tabs + Women Toggle */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <div className="flex gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-semibold text-base transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-900 border-b-2 border-blue-900"
                      : "text-gray-600 hover:text-blue-900"
                  }`}
                >
                  <img src={tab.img} alt={tab.label} className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Women Toggle with Image */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <img src={womenImg} alt="Women" className="w-5 h-5" />
                <span className="text-blue-900 font-semibold text-base animate-blink">
                  WOMEN
                </span>
                <button
                  onClick={() => setWomenOnly(!womenOnly)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    womenOnly ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                      womenOnly ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={() => setShowPopup(true)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Know More
              </button>
            </div>
          </div>

          {/* Booking Row */}
          <div className="flex items-center justify-center gap-4 flex-wrap text-sm">
            {/* Departure / Destination */}
            <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-4 min-w-[240px]">
              <div className="flex flex-col text-sm text-gray-500">
                <span className="text-sm">Departure</span>
                <input
                  type="text"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="font-bold text-lg text-blue-900 bg-transparent outline-none"
                />
              </div>

              <button
                onClick={swapLocations}
                className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5 rotate-90" />
              </button>

              <div className="flex flex-col text-sm text-gray-500">
                <span className="text-sm">Destination</span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="font-bold text-lg text-blue-900 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Leaving Date */}
            <div className="flex flex-col text-sm text-gray-500 bg-gray-100 rounded-xl px-4 py-4 min-w-[160px]">
              <span className="text-sm">Leaving on</span>
              <input
                type="date"
                value={leaving}
                onChange={(e) => setLeaving(e.target.value)}
                className="font-bold text-lg text-blue-900 bg-transparent outline-none"
              />
            </div>

            {/* Passengers */}
            <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-4 min-w-[160px]">
              <Users className="w-6 h-6 text-blue-900" />
              <div className="flex flex-col text-sm text-gray-500">
                <span className="text-sm">Passengers</span>
                <input
                  type="number"
                  min={1}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="font-bold text-lg text-blue-900 bg-transparent outline-none w-16"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
            
             
               onClick={() =>
        navigate("/bus-booking", {
          state: {
            departure,
            destination,
            leaving,
            passengers,
            womenOnly,
          },
        })
      }
      
            >
              <Search className="w-9 h-9" />
            </Button>
          </div>
        </div>
      </div>

      {/* Popup with Auto-Carousel */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-xl w-full relative">
            <h2 className="text-2xl font-bold text-red-600 text-center">
              Booking for Women
            </h2>
            <p className="text-gray-600 text-center mt-2 mb-6">
              Providing helpful details to smartly choose bus travel for women
            </p>

            {/* Carousel */}
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {womenImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="w-full flex-shrink-0 object-contain h-[280px]"
                    alt={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;


