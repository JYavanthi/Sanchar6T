

import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const PriceDetails = () => {
  const { state } = useLocation();
  const { totalPrice = 0 } = state || {};

  return (
    <div className="bg-flixbus-card rounded-lg border border-flixbus-border p-4">
      <h3 className="text-lg font-semibold text-flixbus-text mb-4">Price details</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-flixbus-text">Base Fare</span>
          <span className="font-semibold text-flixbus-text">₹{totalPrice}</span>
        </div>

        <Separator className="bg-flixbus-border" />

        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-flixbus-text">Amount</span>
          <span className="text-lg font-bold text-flixbus-text">₹{totalPrice}</span>
        </div>
      </div>

      <p className="text-xs text-flixbus-light-text mb-4">
        Final payable amount will be updated on the next page
      </p>

      <Button className="w-full bg-[#3D85C6] hover:bg-blue-600 text-white font-semibold py-3 text-base">
        CONTINUE
      </Button>
    </div>
  );
};

export default PriceDetails;
