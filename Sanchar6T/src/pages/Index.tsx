import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PackagesSection from "@/components/PackagesSection";
import Footer from "@/components/Footer";
import Promotion from "@/components/Promotion";
import TravellerVideos from "@/components/TravellerVideos";
import MeetOurGuide from "@/components/MeetOurGuide";
import WhyTravelersLove from "@/components/WhyTravelersLove";
import WhatsAppButton from "@/components/WhatsAppButton";
import ItineraryPlanner from "@/components/ItineraryPlanner";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BookingForm />
      <ReviewsSection />
      <Promotion />
      <FeaturesSection />
      <PackagesSection />
    <ItineraryPlanner />
      <TravellerVideos />
      <MeetOurGuide />
      <WhyTravelersLove />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
