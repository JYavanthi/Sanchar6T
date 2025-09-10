import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TravellerDetails = () => {
  const { state } = useLocation();
  const { selectedSeats = [] } = state || {};

  const [docTypes, setDocTypes] = useState<{ [key: number]: string }>({});
  const [travellerType, setTravellerType] = useState<"IND" | "NRI">("IND");
  const [wheelchairSeats, setWheelchairSeats] = useState<{ [key: number]: boolean }>({});
  const [formData, setFormData] = useState<{ [key: number]: any }>({});
  const [copyFromFirst, setCopyFromFirst] = useState(false);

  const docLabels: Record<string, string> = {
    aadhar: "Aadhar Card",
    pan: "Pan Card",
    dl: "D/L",
    passport: "Passport No",
    voter: "Voter ID",
    ration: "Ration Card",
    others: "Others"
  };

  const getDocumentOptions = () => {
    if (travellerType === "NRI") return [];
    return ["aadhar", "pan", "dl", "passport", "voter", "ration", "others"];
  };

  const toggleWheelchair = (index: number) => {
    setWheelchairSeats(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [index]: { ...prev[index], [field]: value }
    }));
  };

  const handleDocTypeChange = (index: number, value: string) => {
    setDocTypes(prev => ({ ...prev, [index]: value }));
    handleInputChange(index, "docType", value);
  };

  const copyFirstTraveller = () => {
    if (!formData[0]) return;
    setFormData(prev => {
      const updated = { ...prev };
      selectedSeats.forEach((_, i) => {
        if (i !== 0) {
          updated[i] = { ...formData[0] };
        }
      });
      return updated;
    });
    setDocTypes(prev => {
      const updated = { ...prev };
      selectedSeats.forEach((_, i) => {
        if (i !== 0) {
          updated[i] = docTypes[0] || "";
        }
      });
      return updated;
    });
  };

  return (
    <div className="bg-flixbus-card rounded-lg border border-flixbus-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-flixbus-text">Traveller Details</h2>

        {/* Toggle IND/NRI */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-flixbus-text font-medium">IND</span>
          <button
            type="button"
            className={`relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${
              travellerType === "NRI" ? "bg-[#3d85c6]" : "bg-gray-300"
            }`}
            onClick={() =>
              setTravellerType(travellerType === "IND" ? "NRI" : "IND")
            }
          >
            <span
              className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
                travellerType === "NRI" ? "translate-x-6" : "translate-x-1"
              }`}
            ></span>
          </button>
          <span className="text-sm text-flixbus-text font-medium">NRI</span>
        </div>
      </div>

      {/* Copy from first traveller checkbox */}
      {selectedSeats.length > 1 && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            id="copyFromFirst"
            type="checkbox"
            checked={copyFromFirst}
            onChange={(e) => {
              const checked = e.target.checked;
              setCopyFromFirst(checked);
              if (checked) copyFirstTraveller();
            }}
          />
          <Label htmlFor="copyFromFirst" className="text-sm text-flixbus-text font-medium">
            Copy details from 1st traveller
          </Label>
        </div>
      )}

      {selectedSeats.map((seatId: string, index: number) => (
        <div key={seatId} className="mb-8">
          {/* Seat Info */}
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <span className="text-sm text-[#4A4A4A] mr-1">Seat</span>
              <span className="px-2 py-1 rounded text-sm font-bold">{seatId}</span>
            </div>

            {/* Wheelchair Button */}
            <button
              type="button"
              onClick={() => toggleWheelchair(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                wheelchairSeats[index] ? "bg-green-600" : "bg-red-500"
              }`}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wheelchair_symbol.svg"
                alt="Wheelchair"
                className="w-6 h-6 filter invert"
              />
            </button>
          </div>

          {/* Column spacing */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-end">
            {/* Name */}
            <div>
              <Label htmlFor={`name${index}`} className="text-sm font-medium text-flixbus-text">Name</Label>
              <Input
                id={`name${index}`}
                value={formData[index]?.name || ""}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                placeholder="Type here"
                className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue"
              />

              {/* Extra NRI checkbox if toggle is NRI and multiple travellers */}
              {travellerType === "NRI" && selectedSeats.length > 1 && (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    id={`nri${index}`}
                    type="checkbox"
                    checked={formData[index]?.isNRI || false}
                    onChange={(e) => handleInputChange(index, "isNRI", e.target.checked)}
                  />
                  <Label htmlFor={`nri${index}`} className="text-xs text-flixbus-text">
                    NRI
                  </Label>
                </div>
              )}
            </div>

            {/* Age */}
            <div>
              <Label htmlFor={`age${index}`} className="text-sm font-medium text-flixbus-text">Age*</Label>
              <Input
                id={`age${index}`}
                value={formData[index]?.age || ""}
                onChange={(e) => handleInputChange(index, "age", e.target.value)}
                placeholder="eg : 24"
                className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue"
              />
            </div>

            {/* Gender */}
            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-flixbus-text">Gender</Label>
              <RadioGroup
                value={formData[index]?.gender || "male"}
                onValueChange={(val) => handleInputChange(index, "gender", val)}
                className="flex gap-6 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="male"
                    id={`male${index}`}
                    className="border-flixbus-border text-flixbus-blue"
                  />
                  <Label htmlFor={`male${index}`} className="text-sm text-flixbus-text">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="female"
                    id={`female${index}`}
                    className="border-flixbus-border text-flixbus-blue"
                  />
                  <Label htmlFor={`female${index}`} className="text-sm text-flixbus-text">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Document Type + Document No / Passport Input in same row */}
            <div className="md:col-span-2 flex gap-4 w-full">
              {travellerType === "IND" ? (
                <>
                  {/* Document Type */}
                  <div className="flex-1 flex flex-col">
                    <Label className="text-sm font-medium text-flixbus-text">Document</Label>
                    <Select
                      value={docTypes[index] || ""}
                      onValueChange={(value) => handleDocTypeChange(index, value)}
                    >
                      <SelectTrigger className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {getDocumentOptions().map((doc) => (
                          <SelectItem key={doc} value={doc}>{docLabels[doc]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Document No */}
                  <div className="flex-1 flex flex-col">
                    {docTypes[index] ? (
                      <>
                        <Label
                          htmlFor={`docNo${index}`}
                          className="text-sm font-medium text-flixbus-text"
                        >
                          {docLabels[docTypes[index]]}
                        </Label>
                        <Input
                          id={`docNo${index}`}
                          value={formData[index]?.docNo || ""}
                          onChange={(e) => handleInputChange(index, "docNo", e.target.value)}
                          placeholder={`Enter ${docLabels[docTypes[index]]}`}
                          className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue w-full"
                        />
                      </>
                    ) : (
                      <div className="mt-6" /> // Placeholder space to align row
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col">
                  <Label
                    htmlFor={`passport${index}`}
                    className="text-sm font-medium text-flixbus-text"
                  >
                    Passport No
                  </Label>
                  <Input
                    id={`passport${index}`}
                    value={formData[index]?.passport || ""}
                    onChange={(e) => handleInputChange(index, "passport", e.target.value)}
                    placeholder="Enter Passport No"
                    className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravellerDetails;
