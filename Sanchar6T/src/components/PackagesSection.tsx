import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import tirupatiTemple from "@/assets/tirupati-temple.jpg";
import shirdiFTemple from "@/assets/shirdi-temple.jpg";
import varanasiGhats from "@/assets/varanasi-ghats.jpg";

const packages = [
  {
    id: 1,
    title: "Discover Tirupati by Train & Temple Trails – 7 Days",
    description: "This soulful journey takes you through South India's spiritual heartland, combining sacred temples, heritage sites, and natural beauty. Begin with the divine darshan at Lord Venkateswara Temple in Tirumala, explore the goddess temples of Tiruchanur and Srikalahasti, and soak in the serenity of Talakona waterfalls and the Eastern Ghats.",
    image: tirupatiTemple,
    duration: "7 Days",
    location: "Tirupati, Andhra Pradesh",
    price: "₹15,000",
    features: ["Divine Darshan", "Heritage Sites", "Natural Beauty"]
  },
  {
    id: 2,
    title: "Sacred Trails of Shirdi – 3-Day Divine Experience",
    description: "This soulful getaway centers on the holy town of Shirdi, home to the revered Sai Baba Temple, where devotees from across the world gather for darshan and prayer. Alongside temple visits and spiritual rituals, explore the Dwarkamai mosque, Chavadi, and Sai Heritage Village.",
    image: shirdiFTemple,
    duration: "3 Days",
    location: "Shirdi, Maharashtra",
    price: "₹8,500",
    features: ["Sai Baba Temple", "Spiritual Rituals", "Heritage Village"]
  },
  {
    id: 3,
    title: "Kashi – A Journey into India's Soul- 10 Days Soulful Experience",
    description: "Experience the spirit of Varanasi, where faith and tradition flow with the Ganga. Witness sunrise boat rides and the evening Ganga Aarti, visit sacred temples including Kashi Vishwanath, and wander through lanes alive with culture, silk, and street food.",
    image: varanasiGhats,
    duration: "10 Days",
    location: "Varanasi, Uttar Pradesh",
    price: "₹22,000",
    features: ["Ganga Aarti", "Sacred Temples", "Cultural Experience"]
  }
];

const PackagesSection = () => {
  return (
    <div className="py-16 bg-light-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-nav-blue mb-4">
            Featured Trips
          </h2>
          <p className="text-lg text-nav-blue/70">
            Customize these trips with the help of one of our local specialists
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-hero-accent text-nav-blue px-3 py-1 rounded-full font-bold">
                  {pkg.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-nav-blue mb-3 line-clamp-2">
                  {pkg.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-nav-blue/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{pkg.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-nav-blue/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {pkg.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-light-blue text-xs text-nav-blue rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Book Now Button */}
                <Button className="w-full" variant="default">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesSection;