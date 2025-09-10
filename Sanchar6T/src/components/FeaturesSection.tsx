import React from "react";
import { RefreshCw, MapPin, Heart } from "lucide-react";
import calender from "@/assets/calender.png"

const features = [
  {
    id: 1,
    title: "Free Cancellation",
    description: "Get 100% Refund on Cancellation  T&C Apply",
    // icon: RefreshCw,
     color: "bg-[#ffe899]",
    image:
      calender
  },
  {
    id: 2,
    title: "Bus Tracking System",
    description: "Get local bus timings between cities in your state",
    // icon: MapPin,
    color: "bg-[#a7d3ff]",
    image:"https://productcatalo.my.canva.site/buses/_assets/media/d49f569fadede3534a4b13c60f58a986.png"
    
  },
  {
    id: 3,
    title: "Pilgrimage Packages",
    description: "Assured Darshan | Travel and Stay | All inclusive Packages",
    // icon: Heart,
     color: "bg-[#9ba4ff]",
    image:
      "https://productcatalo.my.canva.site/buses/_assets/media/c308ace8aa1a0f278cd7bd522de540b1.png",
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 ">
          <h2 className="text-4xl font-bold text-nav-blue mb-4">
            Why Choose Us?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.color} rounded-[2.5rem] p-6 text-left relative flex flex-col justify-between group hover:scale-105 transition-transform duration-300`}
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-3 bg-white text-center h-[40px] rounded-lg">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black text-xl font-bold mb-6 ">{feature.description}</p>

              {/* Image inside card */}
              <div className="absolute bottom-4 right-4 w-20 h-20 opacity-90">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Know More button */}
              <button className="text-violet font-semibold underline mt-2 z-10 relative">
                Know More &gt;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;


