// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ContactDetails = () => {
//   return (
//     <div className="bg-[#4A4A4A]-card rounded-lg border border border-[#4A4A4A]-light p-6">
//       <div className="mb-4">
//         <h2 className="text-xl font-bold">Contact Details</h2>
//         <p className="text-sm text-[#4A4A4A]">We'll send your ticket here</p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="email" className="text-sm font-medium text-[#4A4A4A]">Email Id*</Label>
//           <Input 
//             id="email" 
//             placeholder="Type here" 
//             className="mt-1 border border-[#4A4A4A] focus:border-[#4A4A4A] focus:ring-[#4A4A4A]"
//           />
//         </div>
//         <div>
//           <Label htmlFor="mobile" className="text-sm font-medium text-[#4A4A4A]">Mobile Number*</Label>
//           <Input 
//             id="mobile" 
//             placeholder="Type here" 
//             className="mt-1 border border-[#4A4A4A] focus:border-[#4A4A4A] focus:ring-[#4A4A4A]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactDetails;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

// List of countries for suggestion only
const countries = [
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "US", name: "United States", dial_code: "+1" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "SG", name: "Singapore", dial_code: "+65" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "AE", name: "UAE", dial_code: "+971" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966" },
  { code: "PK", name: "Pakistan", dial_code: "+92" },
  { code: "BD", name: "Bangladesh", dial_code: "+880" },
  { code: "LK", name: "Sri Lanka", dial_code: "+94" },
  { code: "NP", name: "Nepal", dial_code: "+977" },
  { code: "TH", name: "Thailand", dial_code: "+66" },
];

const ContactDetails = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-[#4A4A4A]-card rounded-lg border border-[#4A4A4A]-light p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Contact Details</h2>
        <p className="text-sm text-[#4A4A4A]">We'll send your ticket here</p>
        <Link to="/practice" >Practice</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-[#4A4A4A]">
            Email Id*
          </Label>
          <Input
            id="email"
            placeholder="Type here"
            className="mt-1 border border-[#4A4A4A] focus:border-[#4A4A4A] focus:ring-[#4A4A4A]"
          />
        </div>

        {/* Mobile */}
        <div>
          <Label htmlFor="mobile" className="text-sm font-medium text-[#4A4A4A]">
            Mobile Number*
          </Label>

          <div className="flex mt-1 border border-[#4A4A4A] rounded focus-within:ring-[#4A4A4A]">
            {/* Flag + Dial Code */}
            <div
              className="flex items-center pl-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <ReactCountryFlag
                countryCode={selectedCountry.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
              />
              <span className="ml-2">{selectedCountry.dial_code}</span>
            </div>

            {/* Dropdown for selection */}
            {showDropdown && (
              <select
                className="absolute ml-2 mt-1 bg-white border rounded z-50"
                value={selectedCountry.code}
                onChange={(e) => {
                  setSelectedCountry(
                    countries.find((c) => c.code === e.target.value) || countries[0]
                  );
                  setShowDropdown(false);
                }}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.dial_code})
                  </option>
                ))}
              </select>
            )}

            {/* Mobile Input */}
            <Input
              id="mobile"
              placeholder="Type here"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="ml-2 flex-1 border-none focus:ring-0 focus:border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

