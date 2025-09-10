
import JourneyDetails from "@/components/booking-details/JourneyDetails";
import TravellerDetails from "@/components/booking-details/TravellerDetails";
import ContactDetails from "@/components/booking-details/ContactDetails";
import GSTDetails from "@/components/booking-details/GSTDetails";
import PincodeSection from "@/components/booking-details/PincodeSection";
import TripAssured from "@/components/booking-details/TripAssured";
import OffersSection from "@/components/booking-details/OffersSection";
import PriceDetails from "@/components/booking-details/PriceDetails";
import { useState } from "react";

const Index = () => {

  return (
    <div className="min-h-screen bg-flixbus-background">
     
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <JourneyDetails />
            <TravellerDetails />
            <ContactDetails />
            <GSTDetails />
            <PincodeSection />
            <TripAssured />
          </div>
          
          {/* Right Column - Offers & Price */}
          <div className="lg:col-span-1 space-y-6">
            <OffersSection />
            <PriceDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;