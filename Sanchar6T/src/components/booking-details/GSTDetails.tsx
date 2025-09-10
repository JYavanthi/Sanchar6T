// import { Button } from "@/components/ui/button";
// import { ChevronDown } from "lucide-react";

// const GSTDetails = () => {
//   return (
//     <div className="bg-flixbus-card rounded-lg border border-flixbus-border p-6">
//       <Button 
//         variant="ghost" 
//         className="w-full justify-between p-0 h-auto text-flixbus-light-text hover:bg-transparent"
//       >
//         <span className="text-sm">📋 Enter GST details (optional)</span>
//         <ChevronDown className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// };

// export default GSTDetails;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const GSTDetails = () => {
  const [showGST, setShowGST] = useState(false);

  return (
    <div className="bg-flixbus-card rounded-lg border border-flixbus-border p-6">
      {/* Toggle */}
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="gst-toggle"
          checked={showGST}
          onCheckedChange={setShowGST}
          className="data-[state=checked]:bg-[#008cff]" // blue toggle color
        />
        <Label
          htmlFor="gst-toggle"
          className="text-sm text-flixbus-light-text font-medium"
        >
          Enter GST details (optional)
        </Label>
      </div>

      {/* GST Fields (only show when toggle is ON) */}
      {showGST && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Number */}
          <div>
            <Label
              htmlFor="company-number"
              className="text-sm font-medium text-flixbus-text"
            >
              Registered Company Number
            </Label>
            <Input
              id="company-number"
              placeholder="Eg: 12ABCDE4567ABCD"
              className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue"
            />
          </div>

          {/* Company Name */}
          <div>
            <Label
              htmlFor="company-name"
              className="text-sm font-medium text-flixbus-text"
            >
              Registered Company Name
            </Label>
            <Input
              id="company-name"
              placeholder="Eg: ABCDE Limited"
              className="mt-1 border-flixbus-border focus:border-flixbus-blue focus:ring-flixbus-blue"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GSTDetails;
