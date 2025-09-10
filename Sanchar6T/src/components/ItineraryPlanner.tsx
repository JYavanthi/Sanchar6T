import { useState } from "react";

const ItineraryPlanner = () => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

  const generateItinerary = async () => {
    if (!city || !days) {
      alert("Please select both city and days.");
      return;
    }

    setLoading(true);
    setError("");
    setItinerary(null);

    try {
      const res = await fetch("http://localhost:5000/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, days }),
      });

      if (!res.ok) throw new Error("Failed to generate itinerary");

      const data = await res.json();
      setItinerary(data.itinerary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6 font-poppins">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3 text-[#226cb2]">
            Plan Your Perfect Trip with Our AI-Powered Itinerary Planner
          </h2>
          <p className="text-gray-700">
            Let our smart AI help you design the ultimate travel experience!
            Simply choose your destination and trip duration, and get a
            personalized day-by-day itinerary packed with exciting places to
            visit, fun activities, and optimal timings — all tailored just for
            you.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="flex-1 bg-white shadow p-4 rounded-xl">
          <h2 className="font-semibold text-lg mb-2 text-[#226cb2]">Get Your Travel Itinerary</h2>
          <label className="block mb-3">
            {/* Select City: */}
            <select
              className="w-full border rounded p-2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              <option>Mumbai</option>
              <option>Hyderabad</option>
              <option>Indore</option>
              <option>Hubballi</option>
              <option>Mangalore</option>
              <option>Bangalore</option>
            </select>
          </label>
          <label className="block mb-3">
            {/* Select Days: */}
            <select
              className="w-full border rounded p-2"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              <option value="">Select Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
            </select>
          </label>
          <button
            onClick={generateItinerary}
            disabled={loading}
            className="w-full text-white p-2 rounded hover:bg-blue-700 bg-[#0369A0]"
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        </div>
      </div>

      {/* Output */}
      <section className="mt-6">
        {error && <p className="text-red-600">{error}</p>}
        {itinerary && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Your Itinerary:</h3>
            <div
              className="p-4 border rounded bg-gray-50"
              dangerouslySetInnerHTML={{ __html: itinerary.replace(/\n/g, "<br>") }}
            />
          </div>
        )}
      </section>
    </section>
  );
};

export default ItineraryPlanner;
