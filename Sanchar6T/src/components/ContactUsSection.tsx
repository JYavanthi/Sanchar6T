import React from "react";

const ContactUsSection = () => {
  return (
    <section className="bg-[#145873] text-white py-10 px-4 text-center">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Sanchar6T isn’t just about travel.
      </h2>

      {/* Subheading */}
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
        It’s about trust, comfort, and devotion—delivered to you, one unforgettable journey at a time.
      </p>

      {/* Contact Button */}
      <button className="bg-white text-black font-semibold text-lg px-8 py-3 rounded-full hover:bg-gray-200 transition">
        Contact Us
      </button>
    </section>
  );
};

export default ContactUsSection;
