


import { useLocation } from "react-router-dom";

const JourneyDetails = () => {
  const { state } = useLocation();
  const { boardingPoint, droppingPoint,duration } = state || {};

  return (
    <div className="bg-flixbus-card rounded-lg border border-flixbus-border p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Departure */}
        <div>
          <div className="text-2xl font-bold text-flixbus-text mb-1">{boardingPoint?.time || "--:--"}</div>
          <div className="text-base font-semibold text-flixbus-text mb-1">{boardingPoint?.name || "Boarding"}</div>
          <div className="text-xs text-flixbus-light-text leading-relaxed">{boardingPoint?.address}</div>
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm text-flixbus-light-text mb-2">{duration}</div>
          <div className="w-full h-px bg-[#4A4A4A] relative">
            <div className="absolute left-0 top-1/2 w-2 h-2 bg-[#4A4A4A] rounded-full -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-2 h-2 bg-[#4A4A4A] rounded-full -translate-y-1/2"></div>
          </div>
        </div>

        {/* Arrival */}
        <div>
          <div className="text-2xl font-bold text-flixbus-text mb-1">{droppingPoint?.time || "--:--"}</div>
          <div className="text-base font-semibold text-flixbus-text mb-1">{droppingPoint?.name || "Dropping"}</div>
          <div className="text-xs text-flixbus-light-text leading-relaxed">{droppingPoint?.address}</div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetails;
