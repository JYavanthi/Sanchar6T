import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Akshith J",
    location: "Banglore, Karnataka.",
    review: "Booked my Tirupati pilgrimage via Sanchar6t – smooth bus booking, helpful guides, comfy Volvo ride and VIP darshan. Great value, would travel with them again!",
    rating: 5,
    avatar: "AJ"
  },
  {
    id: 2,
    name: "Rushikesh R",
    location: "Pune, Maharashtra",
    review: "Excellent service and well-planned itinerary. Our Shirdi trip was peaceful and perfectly managed. Highly recommended for spiritual travel!",
    rating: 5,
    avatar: "RR"
  },
  {
    id: 3,
    name: "Yavanthi S",
    location: "Banglore, Karnataka.",
    review: "Sanchar6t made our family trip to Kanyakumari super easy. Good coordination, decent pricing, and timely updates. Will book again!",
    rating: 5,
    avatar: "YS"
  }
];

const ReviewsSection = () => {
  return (
    <div className="py-16 bg-light-blue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-nav-blue mb-4">
            Travelers Love Sanchar6T
          </h2>
          <p className="text-lg text-nav-blue/70 mb-6">
            25,000+ people booked from Bengaluru on Sanchar6T last month
          </p>
          <button className="text-primary font-medium hover:underline">
            Read more reviews
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-nav-blue">{review.name}</h4>
                  <p className="text-sm text-nav-blue/70">{review.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-button text-yellow-button" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-nav-blue/80 leading-relaxed">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;