import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tirupati from "./pages/TirupatiPackages"; 
import Preloader from "./components/PreLoader";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BusBooking from "./pages/BusBooking";
import SignupLogin from "./pages/SignupLogin";
import BookingDetails from "./pages/BookingDetails";
import Practice from "./pages/Practice";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // ⏳ show for 1 second
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />; // ✅ Show Preloader first
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ✅ New Itinerary route */}
            <Route path="/tirupati-packages" element={<Tirupati />} />
            <Route path="/about-us" element={<AboutUs />} />
            
            
           <Route path="/contact-us" element={<ContactUs />} />
           <Route path="/bus-booking" element={<BusBooking />} />
           <Route path="/signup-login" element={<SignupLogin />} />
           <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/practice" element={<Practice />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
