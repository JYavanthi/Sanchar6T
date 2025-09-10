import BusBookingHeader from "@/components/home/BusBookingHeader";
import FilterSidebar from "@/components/home/FilterSidebar";
import BusResultsHeader from "@/components/home/BusResultsHeader";
import BusListings from "@/components/home/BusListings";

const Practice = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BusBookingHeader />
      
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <FilterSidebar />
        
        {/* Results Area */}
        <div className="flex-1">
          <BusResultsHeader />
          <BusListings />
        </div>
      </div>
    </div>
  );
};

export default Practice;