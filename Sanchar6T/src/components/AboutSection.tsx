import heroGroup1 from "@/assets/hero-group-1.jpg";
import heroGroup2 from "@/assets/hero-group-2.jpg";
import heroGroup3 from "@/assets/hero-group-3.jpg";

const AboutSection = () => {
  return (
    <section className="py-14 bg-white"> {/* reduced vertical padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="space-y-3"> {/* reduced spacing between rows */}
            {/* First row - single full-width image */}
            <div>
              <img 
                src={heroGroup1} 
                alt="Happy travelers group" 
                className="w-full h-72 md:h-[22rem] object-cover rounded-2xl shadow-elegant"
              />
            </div>
            
            {/* Second row - two side-by-side images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img 
                src={heroGroup2} 
                alt="Travel consultation" 
                className="w-full h-56 object-cover rounded-2xl shadow-elegant"
              />
              <img 
                src={heroGroup3} 
                alt="Group dining experience" 
                className="w-full h-56 object-cover rounded-2xl shadow-elegant"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-text-dark mb-2">
                About Us
              </h2>
              <h3 className="text-xl text-text-light mb-6">
                Your Journey. Our Promise.
              </h3>
            </div>

            <div className="space-y-4 text-text-dark leading-relaxed">
              <p>
                At Sanchar6T, we believe travel is more than just moving from one place to another
                —it's about creating seamless experiences and lasting memories. Specializing in
                Tirupati Balaji pilgrimages and custom travel solutions, we make your journey
                effortless, comfortable, and truly divine.
              </p>

              <p>
                With years of expertise and a deep understanding of devotional travel, we curate
                all-inclusive Tirupati packages featuring:
              </p>

              <ul className="space-y-2 list-disc list-inside text-text-dark ml-4">
                <li>Hassle-free travel in luxury AC buses & private cabs</li>
                <li>VIP Darshan arrangements for a smooth temple experience</li>
                <li>Comfortable stays & authentic vegetarian meals</li>
                <li>Personalized assistance every step of the way</li>
              </ul>

              <p>
                Led by our founder KN Nagesh, Sanchar6T is trusted by thousands of happy
                travelers who choose us for our reliability, transparency, and heartfelt service.
                Whether you're embarking on a spiritual pilgrimage or planning a group journey, we
                ensure every detail is handled with care, so you can focus on what truly matters— 
                your experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
