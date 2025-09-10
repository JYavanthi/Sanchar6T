import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, User } from "lucide-react";
import BusLayout from "./BusLayout.tsx"; 

interface BusListingProps {
  busNumber: string;
  operator: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  price: string;
  seatsAvailable: number;
  totalSeats: number;
  amenities?: string[];
  hasInfo?: boolean;
  isVia?: boolean;
  viaStops?: number;
  boardingPoints?: string[];
}

const BusListing = ({
  busNumber,
  operator,
  busType,
  departureTime,
  arrivalTime,
  duration,
  date,
  price,
  seatsAvailable,
  totalSeats,
  amenities = [],
  hasInfo = false,
  isVia = false,
  viaStops = 0,
  boardingPoints = [],
}: BusListingProps) => {
  const hasSeats = seatsAvailable > 0;

  // State
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showSeats, setShowSeats] = useState(false);

  return (
    <div className="relative bg-white border-b border-gray-200 hover:bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex-1 max-w-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold text-[#3d85c6]">
                {busNumber}
              </span>
              {hasInfo && (
                <div className="flex gap-1 relative">
                  <User className="w-4 h-4 text-gray-500" />
                  <div
                    className="relative"
                    onMouseEnter={() => setShowAmenitiesModal(true)}
                    onMouseLeave={() => setShowAmenitiesModal(false)}
                  >
                    <Monitor className="w-4 h-4 text-gray-500 cursor-pointer" />
                    {showAmenitiesModal && (
                      <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-300 shadow-lg rounded-lg p-3 z-50">
                        <h3 className="text-sm font-semibold text-[#3d85c6] mb-2">
                          Amenities
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {amenities.length > 0 ? (
                            amenities.map((a, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-[#3d85c6]/10 text-[#3d85c6] text-xs rounded"
                              >
                                {a}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">
                              No amenities listed
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">+{viaStops}</span>
                </div>
              )}
            </div>
          </div>

          {/* Middle Section */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-4 bg-[#3d85c6] rounded-sm flex items-center justify-center">
                <span className="text-xs text-white font-medium">2+1</span>
              </div>
              <span className="text-sm text-gray-700">{busType}</span>
              {amenities.map((a, idx) => (
                <span key={idx} className="text-xs text-gray-500">
                  {a}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-[#3d85c6]">
                  {departureTime}
                </div>
                <div className="text-sm text-gray-500">{date}</div>
                <div className="text-xs text-[#3d85c6]">Boarding Points</div>
              </div>

              <div className="flex-1 text-center">
                <div className="text-sm text-gray-500">{duration}</div>
                <div className="w-full h-0.5 bg-gray-300 my-1 relative"></div>
              </div>

              <div className="text-center">
                <div className="text-lg font-semibold text-[#3d85c6]">
                  {arrivalTime}
                </div>
                <div className="text-sm text-gray-500">{date}</div>
                <div className="text-xs text-[#3d85c6]">Dropping Points</div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-lg font-bold text-[#3d85c6]">
                {seatsAvailable}
              </div>
              <div className="text-sm text-gray-500">Seats available</div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold text-[#3d85c6]">{price}</div>
            </div>

            <div>
              {hasSeats ? (
                <Button
                  onClick={() => setShowSeats((prev) => !prev)}
                  className="bg-[#3d85c6] hover:bg-[#2d6da1] text-white px-6 py-2 rounded text-sm font-medium"
                >
                  {showSeats ? "HIDE SEATS" : "VIEW SEATS"}
                </Button>
              ) : (
                <Button
                  className="bg-gray-400 text-white px-6 py-2 rounded text-sm font-medium"
                  disabled
                >
                  SOLD OUT
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Replace old Seat Layout with new Index component */}
      {showSeats && (
        <div className="max-w-6xl mx-auto px-6 py-6 border-t border-gray-300 bg-gray-50">
          <BusLayout duration={duration} />
        </div>
      )}
    </div>
  );
};

export default BusListing;
