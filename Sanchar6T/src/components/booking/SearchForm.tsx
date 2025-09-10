import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowUpDown } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="bg-white p-6 border-b border-gray-300">
      <div className="flex items-center gap-4 max-w-6xl mx-auto">
        {/* Origin */}
        <div className="flex-1">
          <label className="text-sm text-gray-700 mb-1 block">Origin</label>
          <Select defaultValue="bangalore">
            <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2">
              <SelectValue placeholder="Select Origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Swap icon */}
        <div className="mt-6">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
        </div>

        {/* Destination */}
        <div className="flex-1">
          <label className="text-sm text-gray-700 mb-1 block">Destination</label>
          <Select defaultValue="tirupati">
            <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2">
              <SelectValue placeholder="Select Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tirupati">Tirupati</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Onward Date */}
        <div className="flex-1">
          <label className="text-sm text-gray-700 mb-1 block">Onward Date</label>
          <Input
            type="date"
            defaultValue="2025-09-04"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Return Date */}
        <div className="flex-1">
          <label className="text-sm text-gray-700 mb-1 block">Return Date</label>
          <Input
            type="date"
            placeholder="Return"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <Button className="bg-[#0b4d71] hover:bg-[#093954] text-white px-8 py-2.5 rounded">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
