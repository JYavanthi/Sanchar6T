// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import tirupatiTemple from "@/assets/tirupati-temple.jpg";
// import beachDestination from "@/assets/beach-destination.jpg";
// import shirdiFTemple from "@/assets/shirdi-temple.jpg";

// const carouselCards = [
//   {
//     src: tirupatiTemple,
//     title: "TIRUPATI",
//     subtitle: "Round Trip",
//     price: "Rs.5000"
//   },
//   {
//     src: beachDestination,
//     title: "GOKARNA", 
//     subtitle: "Round Trip",
//     price: "Rs.6000"
//   },
//   {
//     src: shirdiFTemple,
//     title: "SHIRDI",
//     subtitle: "Round Trip", 
//     price: "Rs.4500"
//   }
// ];

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselCards.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + carouselCards.length) % carouselCards.length);
//   };

//   return (
//     <div className="relative min-h-[700px] overflow-hidden">
//       {/* Hero Background - Using the uploaded reference image */}
//       <div className="absolute inset-0">
//         <img 
//           src="https://productcatalo.my.canva.site/buses/_assets/media/7118155fa4fcbce624c567ea8c8b93e9.jpg" 
//           alt="Beautiful coastal landscape with turquoise water"
//           className="w-full h-full object-cover"
//         />
//       </div>
      
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-40">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
//           {/* Left Content */}
//           <div className="text-white z-10">
//             <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
//               Explore India with<br />
//               <span className="text-white">Ease</span>
//             </h1>
            
//             <p className="text-xl mb-10 text-white/95 leading-relaxed max-w-lg">
//               Get the affordable ticket for you in every season without any worries.
//               We are also giving a special offer on a round-trip for some destination,
//               so you can earn points from it!
//             </p>
            
//             <Button variant="hero" size="lg" className="text-lg px-10 py-4 font-semibold">
//               More Details
//             </Button>
//           </div>

//           {/* Right Floating Cards */}
//           <div className="relative flex items-center justify-end z-10">
//             {/* Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//             >
//               <ChevronLeft className="w-7 h-7 text-white" />
//             </button>
            
//             <button
//               onClick={nextSlide}
//               className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//             >
//               <ChevronRight className="w-7 h-7 text-white" />
//             </button>

//             {/* Cards Container */}
//             <div className="relative">
//               {/* Main Large Card */}
//               <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
//                 <img 
//                   src={carouselCards[currentSlide].src} 
//                   alt={carouselCards[currentSlide].title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/20"></div>
                
//                 {/* Content Overlay */}
//                 <div className="absolute bottom-4 left-4 text-white">
//                   <h3 className="text-lg font-bold mb-1">{carouselCards[currentSlide].title}</h3>
//                   <div className="flex items-center gap-2">
//                     <p className="text-lg font-bold">{carouselCards[currentSlide].price}</p>
//                     <span className="text-xs opacity-90">{carouselCards[currentSlide].subtitle}</span>
//                   </div>
//                 </div>
                
//                 {/* Plus Icon */}
//                 <div className="absolute top-4 right-4">
//                   <div className="w-8 h-8 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
//                     <Plus className="w-4 h-4 text-white font-bold" />
//                   </div>
//                 </div>
//               </div>

//               {/* Second Card (Partially Visible) */}
//               <div className="absolute -top-6 -right-12 w-36 h-32 rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 z-10">
//                 <img 
//                   src={carouselCards[(currentSlide + 1) % carouselCards.length].src} 
//                   alt="Next destination"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black/30"></div>
                
//                 {/* Small card content */}
//                 <div className="absolute bottom-2 left-2 text-white">
//                   <p className="text-xs font-semibold">{carouselCards[(currentSlide + 1) % carouselCards.length].title}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;


//fully code working in lovable code













// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion"; // ✅ added for animation
// import tirupatiTemple from "@/assets/tirupati-temple.jpg";
// import tirupatiKalasti from "@/assets/tirupati-kalasti.jpg";
// import studentTrip from "@/assets/student-trip.jpg";
// import coporateTours from "@/assets/corporate-tours.jpeg";
// import eventTrip from "@/assets/student-trip.jpg";

// const carouselCards = [
//   {
//     src: tirupatiTemple,
//     title: "TIRUPATI",
//     subtitle: "Round Trip",
//     price: "Rs.5000",
//   },
//   {
//     src: tirupatiKalasti,
//     title: "Tirupati Kalahasti",
//     subtitle: "Round Trip",
//     price: "Rs.6000",
//   },
//   {
//     src: studentTrip,
//     title: "Student Trip",
//     subtitle: "Round Trip",
//     price: "Rs.4500",
//   },
//   {
//     src: coporateTours,
//     title: "Corporate Tours",
//     subtitle: "Round Trip",
//     price: "Rs.3500",
//   },
//   {
//     src: eventTrip,
//     title: "Event Trip",
//     subtitle: "Round Trip",
//     price: "Rs.25000",
//   },
// ];

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselCards.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + carouselCards.length) % carouselCards.length
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <img
//           src="https://productcatalo.my.canva.site/buses/_assets/media/7118155fa4fcbce624c567ea8c8b93e9.jpg"
//           alt="Beautiful coastal landscape with turquoise water"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center min-h-[400px]">
//           {/* Left Content */}
//           <div className="text-white z-10 text-center lg:text-left">
//             <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
//               Explore India with
//               <br />
//               <span className="text-white">Ease</span>
//             </h1>

//             <p className="text-base sm:text-lg md:text-xl mb-8 text-white/95 leading-relaxed max-w-lg mx-auto lg:mx-0">
//               Get the affordable ticket for you in every season without any
//               worries. We are also giving a special offer on a round-trip for
//               some destinations, so you can earn points from it!
//             </p>

//             <Button
//               variant="hero"
//               size="lg"
//               className="text-base md:text-lg px-6 md:px-10 py-3 md:py-4 font-semibold "
//             >
//               More Details
//             </Button>
//           </div>

//           {/* Right Carousel Cards */}
//           <div className="relative flex items-center justify-center z-10">
//             {/* Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//             >
//               <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//             >
//               <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
//             </button>

//             {/* Cards with Animation */}
//             <div className="relative flex items-center justify-center">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentSlide}
//                   initial={{ opacity: 0, x: 80 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -80 }}
//                   transition={{ duration: 0.6, ease: "easeInOut" }}
//                   className="relative w-56 h-40 sm:w-64 sm:h-44 md:w-72 md:h-48 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20"
//                 >
//                   <img
//                     src={carouselCards[currentSlide].src}
//                     alt={carouselCards[currentSlide].title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/20"></div>

//                   {/* Overlay */}
//                   <div className="absolute bottom-4 left-4 text-white">
//                     <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">
//                       {carouselCards[currentSlide].title}
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       <p className="text-sm sm:text-base md:text-lg font-bold">
//                         {carouselCards[currentSlide].price}
//                       </p>
//                       <span className="text-[10px] sm:text-xs opacity-90">
//                         {carouselCards[currentSlide].subtitle}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Plus Icon */}
//                   <div className="absolute top-3 right-3">
//                     <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
//                       <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white font-bold" />
//                     </div>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>

//               {/* Second (Preview) Card with animation */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentSlide + "-preview"}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5, ease: "easeInOut" }}
//                   className="absolute top-4 -right-16 sm:top-6 sm:-right-20 w-28 h-24 sm:w-36 sm:h-32 rounded-xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm border border-white/20"
//                 >
//                   <img
//                     src={
//                       carouselCards[(currentSlide + 1) % carouselCards.length].src
//                     }
//                     alt="Next destination"
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/30"></div>

//                   <div className="absolute bottom-2 left-2 text-white">
//                     <p className="text-[10px] sm:text-xs font-semibold">
//                       {
//                         carouselCards[(currentSlide + 1) % carouselCards.length]
//                           .title
//                       }
//                     </p>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;



import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { motion } from "framer-motion"; // ✅ keep motion only
import tirupatiTemple from "@/assets/tirupati-temple.jpg";
import tirupatiKalasti from "@/assets/tirupati-kalasti.jpg";
import studentTrip from "@/assets/student-trip.jpg";
import coporateTours from "@/assets/corporate-tours.jpeg";
import eventTrip from "@/assets/event-trip.jpg";

const carouselCards = [
  {
    src: tirupatiTemple,
    title: "TIRUPATI",
    subtitle: "Round Trip",
    price: "Rs.5000",
  },
  {
    src: tirupatiKalasti,
    title: "Tirupati Kalahasti",
    subtitle: "Round Trip",
    price: "Rs.6000",
  },
  {
    src: studentTrip,
    title: "Student Trip",
    subtitle: "Round Trip",
    price: "Rs.4500",
  },
  {
    src: coporateTours,
    title: "Corporate Tours",
    subtitle: "Round Trip",
    price: "Rs.3500",
  },
  {
    src: eventTrip,
    title: "Event Trip",
    subtitle: "Round Trip",
    price: "Rs.25000",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselCards.length) % carouselCards.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://productcatalo.my.canva.site/buses/_assets/media/7118155fa4fcbce624c567ea8c8b93e9.jpg"
          alt="Beautiful coastal landscape with turquoise water"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center min-h-[400px]">
          {/* Left Content */}
          <div className="text-white z-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Explore India with
              <br />
              <span className="text-white">Ease</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl mb-8 text-white/95 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Get the affordable ticket for you in every season without any
              worries. We are also giving a special offer on a round-trip for
              some destinations, so you can earn points from it!
            </p>

            <Button
              variant="hero"
              size="lg"
              className="text-base md:text-lg px-6 md:px-10 py-3 md:py-4 font-semibold "
            >
              More Details
            </Button>
          </div>

          {/* Right Carousel Cards */}
          <div className="relative flex items-center justify-center z-10">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            {/* Cards with Sliding Effect */}
            <div className="relative flex items-center justify-center w-[300px] sm:w-[350px] md:w-[400px]">
              {carouselCards.map((card, index) => {
                const isActive = index === currentSlide;
                const isNext = index === (currentSlide + 1) % carouselCards.length;

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0.7,
                      x: isActive ? 0 : isNext ? 160 : -160,
                      zIndex: isActive ? 10 : 5,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                    style={{
                      width: isActive ? "280px" : "160px",
                      height: isActive ? "200px" : "120px",
                    }}
                  >
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">
                        {card.title}
                      </h3>
                      {isActive && (
                        <div className="flex items-center gap-2">
                          <p className="text-sm sm:text-base md:text-lg font-bold">
                            {card.price}
                          </p>
                          <span className="text-[10px] sm:text-xs opacity-90">
                            {card.subtitle}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Plus Icon */}
                    {isActive && (
                      <div className="absolute top-3 right-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white font-bold" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
