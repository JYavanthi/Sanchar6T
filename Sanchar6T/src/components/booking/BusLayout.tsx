// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { Link } from 'react-router-dom';

// interface Seat {
//   id: string;
//   price: number;
//   isAvailable: boolean;
//   isSelected: boolean;
//   type: 'seater' | 'sleeper';
// }

// const BusLayout = () => {
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [hoveredSeat, setHoveredSeat] = useState<{ seat: Seat; x: number; y: number } | null>(null);
//   const [seatsVisible, setSeatsVisible] = useState(true);
//   const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<number | null>(null);
//   const [selectedDropPoint, setSelectedDropPoint] = useState<number | null>(null);

//   const lowerBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
//     id: `L${i + 1}`,
//     price: 599 + (i % 6) * 100,
//     isAvailable: i % 3 !== 0 ? true : false,
//     isSelected: false,
//     type: i < 12 ? 'seater' : 'sleeper'
//   }));

//   const upperBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
//     id: `U${i + 1}`,
//     price: 699 + (i % 6) * 100,
//     isAvailable: i % 4 !== 0 ? true : false,
//     isSelected: false,
//     type: i < 12 ? 'seater' : 'sleeper'
//   }));

//   const [femaleSeatId] = useState(() => {
//     const availableSeats = lowerBerthSeats.concat(upperBerthSeats).filter(s => s.isAvailable);
//     const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
//     return randomSeat.id;
//   });

//   const handleSeatClick = (seatId: string) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   const handleBoardingPointSelect = (index: number) => {
//     setSelectedBoardingPoint(index);
//   };

//   const handleDropPointSelect = (index: number) => {
//     setSelectedDropPoint(index);
//   };

//   const calculateTotalPrice = () => {
//     const allSeats = [...lowerBerthSeats, ...upperBerthSeats];
//     return selectedSeats.reduce((total, seatId) => {
//       const seat = allSeats.find(s => s.id === seatId);
//       return total + (seat?.price || 0);
//     }, 0);
//   };

//   const isFormComplete = selectedSeats.length > 0 && selectedBoardingPoint !== null && selectedDropPoint !== null;

//   const SeatComponent = ({ seat }: { seat: Seat }) => {
//     const isSelected = selectedSeats.includes(seat.id);

//     const availableImg = "https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Available.png&w=64&q=75";
//     const selectedImg = "https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Selected.png&w=64&q=75";
//     const blockedImg = "https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Unavailable_Male.png&w=64&q=75";
//     const femaleImg = "https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Available_Female.png&w=64&q=75";

//     let seatImage = availableImg;
//     if (!seat.isAvailable) seatImage = blockedImg;
//     else if (seat.id === femaleSeatId) seatImage = femaleImg;
//     if (isSelected) seatImage = selectedImg;

//     const baseFare = seat.price;
//     const discount = Math.floor(baseFare * 0.1);
//     const netBaseFare = baseFare - discount;
//     const gst = Math.floor(netBaseFare * 0.18);

//     const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//       const rect = (e.target as HTMLDivElement).getBoundingClientRect();
//       setHoveredSeat({ seat, x: rect.right, y: rect.top });
//     };

//     return (
//       <div
//         className={`relative scale-95 cursor-pointer transition-all duration-300 ${!seat.isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//         onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={() => setHoveredSeat(null)}
//       >
//         <img
//           src={seatImage}
//           alt={seat.id}
//           className={`w-12 h-10 object-contain mx-auto transition-colors duration-300 ${isSelected ? 'scale-110' : 'scale-100'}`}
//         />
//         <div className="text-[11px] text-price-text mt-1 text-center">₹{seat.price}</div>
//       </div>
//     );
//   };

//   const boardingPoints = [
//     { time: '21:15, 06 SEP', name: 'Morigate', address: 'Shop no A-5 morigate golchakkar mother dairy infront of dispensary', contact: '8604875557', phone: '9319121024' },
//     { time: '21:30, 06 SEP', name: 'ISBT Kashmiri Gate', address: 'Morigate golchakkar', contact: '8604875557', phone: '9044266660' },
//     { time: '22:00, 06 SEP', name: 'Akshardham Metro Station', address: 'Yamuna bank metro Station', contact: '8604875557', phone: '9044266660' },
//     { time: '22:30, 06 SEP', name: 'NOIDA 0 POINT NEAR PARICHOUK', address: 'NOIDA 0 POINT', contact: '8604875557', phone: '9044266660' }
//   ];

//   const droppingPoints = [
//     { time: '03:45, 07 SEP', name: 'Kanpur', address: 'Ramadevi Chauraha Kanpur', contact: '7439049009', phone: '7408713009' }
//   ];

//   const allSeats = [...lowerBerthSeats, ...upperBerthSeats];

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid grid-cols-2 gap-8">
//           {/* Seats Section */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
//             {seatsVisible && (
//               <div className="space-y-6">
//                 <div className="flex gap-10">
//                   {/* LOWER BERTH */}
//                   <div>
//                     <h3 className="text-sm font-medium text-muted-foreground mb-3">LOWER BERTH ({lowerBerthSeats.length})</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {lowerBerthSeats.map(seat => <SeatComponent key={seat.id} seat={seat} />)}
//                     </div>
//                   </div>
//                   {/* UPPER BERTH */}
//                   <div>
//                     <h3 className="text-sm font-medium text-muted-foreground mb-3">UPPER BERTH ({upperBerthSeats.length})</h3>
//                     <div className="grid grid-cols-3 gap-3">
//                       {upperBerthSeats.map(seat => <SeatComponent key={seat.id} seat={seat} />)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Boarding & Drop Points Section */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Select Pickup & Drop Points</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-medium">BOARDING POINTS</h3>
//                   <ChevronUp className="w-4 h-4 text-muted-foreground" />
//                 </div>
//                 <div className="max-h-64 overflow-y-auto space-y-2">
//                   {boardingPoints.map((point, index) => (
//                     <div
//                       key={index}
//                       className={`border rounded p-2 cursor-pointer transition-colors ${selectedBoardingPoint === index ? 'border-primary bg-seat-selected' : 'border-tab-border hover:border-primary'}`}
//                       onClick={() => handleBoardingPointSelect(index)}
//                     >
//                       <div className="font-medium text-xs">{point.time}</div>
//                       <div className="font-semibold text-sm">{point.name}</div>
//                       <div className="text-xs text-pickup-text mt-1">{point.address}</div>
//                       <div className="text-xs text-pickup-text">{point.contact}</div>
//                       <div className="text-xs text-pickup-text">{point.phone}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="space-y-2 text-sm">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-medium">DROP POINTS</h3>
//                   <ChevronDown className="w-4 h-4 text-muted-foreground" />
//                 </div>
//                 <div className="space-y-2">
//                   {droppingPoints.map((point, index) => (
//                     <div
//                       key={index}
//                       className={`border rounded p-2 cursor-pointer transition-colors ${selectedDropPoint === index ? 'border-primary bg-seat-selected' : 'border-tab-border hover:border-primary'}`}
//                       onClick={() => handleDropPointSelect(index)}
//                     >
//                       <div className="font-medium text-xs">{point.time}</div>
//                       <div className="font-semibold text-sm">{point.name}</div>
//                       <div className="text-xs text-pickup-text mt-1">{point.address}</div>
//                       <div className="text-xs text-pickup-text">{point.contact}</div>
//                       <div className="text-xs text-pickup-text">{point.phone}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-tab-border pt-4 mt-4">

//               {/* <Button className="w-full" disabled={!isFormComplete} size="lg">
//                 CONTINUE
//               </Button> */}
//               <Link to="/booking-details">
//               <Button className="w-full" disabled={!isFormComplete} size="lg">
//                 CONTINUE
//               </Button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Selected Seat Summary */}
//         <div className="mt-8">
//           <h2 className="text-lg font-semibold mb-4">Know your seats</h2>
//           <div className="text-center py-8 text-muted-foreground">
//             {selectedSeats.length > 0 ? (
//               <div>
//                 <p className="mb-2">Selected Seats:</p>
//                 <div className="space-y-1">
//                   {selectedSeats.map(seatId => {
//                     const seat = allSeats.find(s => s.id === seatId);
//                     return <div key={seatId} className="text-sm">{seatId} - ₹{seat?.price}</div>;
//                   })}
//                 </div>
//                 <div className="mt-4 p-3 bg-muted rounded">
//                   <div className="font-semibold text-lg">Total: ₹{calculateTotalPrice()}</div>
//                   <div className="text-xs text-muted-foreground">{selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected</div>
//                 </div>
//               </div>
//             ) : (
//               <p>Select a seat to see details</p>
//             )}
//           </div>
//         </div>

//         {/* Tooltip */}
//         {hoveredSeat && (
//           <div
//             className="fixed z-[9999] w-48 bg-[#3D85C6] border border-gray-300 rounded shadow-lg p-3 text-xs text-[#FFFFFF]"
//             style={{ top: hoveredSeat.y, left: hoveredSeat.x + 20 }}
//           >
//             { !hoveredSeat.seat.isAvailable ? (
//               <div className="text-center font-bold text-lg">Booked</div>
//             ) : (
//               <>
//                 <div className='text-center text-xl font-bold'>{hoveredSeat.seat.id === femaleSeatId ? 'Female Seat' : 'Seat Details'}</div>
//                 <div><span className="font-semibold">Seat No:</span> {hoveredSeat.seat.id}</div>
//                 <div><span className="font-semibold">Seat Type:</span> {hoveredSeat.seat.type}</div>
//                 <div><span className="font-semibold">Base Fare:</span> ₹{hoveredSeat.seat.price}</div>
//                 <div><span className="font-semibold">Discount:</span> ₹{Math.floor(hoveredSeat.seat.price * 0.1)}</div>
//                 <div><span className="font-semibold">Net Base Fare:</span> ₹{hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)}</div>
//                 <div><span className="font-semibold">GST:</span> ₹{Math.floor((hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)) * 0.18)}</div>
//                 <div className="font-bold mt-1"><span>Total:</span> ₹{Math.floor((hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)) * 1.18)}</div>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BusLayout;

// the above is without the seat , price logic









import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Seat {
  id: string;
  price: number;
  isAvailable: boolean;
  isSelected: boolean;
  type: 'seater' | 'sleeper';
}

interface BusLayoutProps {
  duration: string; 
}

const BusLayout: React.FC<BusLayoutProps> = ({ duration }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [hoveredSeat, setHoveredSeat] = useState<{ seat: Seat; x: number; y: number } | null>(null);
  const [seatsVisible, setSeatsVisible] = useState(true);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<number | null>(null);
  const [selectedDropPoint, setSelectedDropPoint] = useState<number | null>(null);

  const navigate = useNavigate();

  const lowerBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
    id: `L${i + 1}`,
    price: 599 + (i % 6) * 100,
    isAvailable: i % 3 !== 0,
    isSelected: false,
    type: i < 12 ? 'seater' : 'sleeper',
  }));

  const upperBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
    id: `U${i + 1}`,
    price: 699 + (i % 6) * 100,
    isAvailable: i % 4 !== 0,
    isSelected: false,
    type: i < 12 ? 'seater' : 'sleeper',
  }));

  const [femaleSeatId] = useState(() => {
    const availableSeats = lowerBerthSeats.concat(upperBerthSeats).filter(s => s.isAvailable);
    const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
    return randomSeat.id;
  });

  const allSeats = [...lowerBerthSeats, ...upperBerthSeats];

  const handleSeatClick = (seatId: string) => {
    if (!allSeats.find(s => s.id === seatId)?.isAvailable) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBoardingPointSelect = (index: number) => {
    setSelectedBoardingPoint(index);
  };

  const handleDropPointSelect = (index: number) => {
    setSelectedDropPoint(index);
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = allSeats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const isFormComplete =
    selectedSeats.length > 0 && selectedBoardingPoint !== null && selectedDropPoint !== null;

  const boardingPoints = [
    {
      time: '21:15, 06 SEP',
      name: 'Morigate',
      address: 'Shop no A-5 morigate golchakkar mother dairy infront of dispensary',
      contact: '8604875557',
      phone: '9319121024',
    },
    {
      time: '21:30, 06 SEP',
      name: 'ISBT Kashmiri Gate',
      address: 'Morigate golchakkar',
      contact: '8604875557',
      phone: '9044266660',
    },
    {
      time: '22:00, 06 SEP',
      name: 'Akshardham Metro Station',
      address: 'Yamuna bank metro Station',
      contact: '8604875557',
      phone: '9044266660',
    },
    {
      time: '22:30, 06 SEP',
      name: 'NOIDA 0 POINT NEAR PARICHOUK',
      address: 'NOIDA 0 POINT',
      contact: '8604875557',
      phone: '9044266660',
    },
  ];

  const droppingPoints = [
    {
      time: '03:45, 07 SEP',
      name: 'Kanpur',
      address: 'Ramadevi Chauraha Kanpur',
      contact: '7439049009',
      phone: '7408713009',
    },
  ];

  const SeatComponent = ({ seat }: { seat: Seat }) => {
    const isSelected = selectedSeats.includes(seat.id);

    const availableImg =
      'https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Available.png&w=64&q=75';
    const selectedImg =
      'https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Selected.png&w=64&q=75';
    const blockedImg =
      'https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Unavailable_Male.png&w=64&q=75';
    const femaleImg =
      'https://www.makemytrip.com/bus-mmt-next/_next/image?url=%2Fbus-mmt-next%2FSleeper_Available_Female.png&w=64&q=75';

    let seatImage = availableImg;
    if (!seat.isAvailable) seatImage = blockedImg;
    else if (seat.id === femaleSeatId) seatImage = femaleImg;
    if (isSelected) seatImage = selectedImg;

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      setHoveredSeat({ seat, x: rect.right, y: rect.top });
    };

    return (
      <div
        className={`relative scale-95 cursor-pointer transition-all duration-300 ${
          !seat.isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
        onClick={() => seat.isAvailable && handleSeatClick(seat.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHoveredSeat(null)}
      >
        <img
          src={seatImage}
          alt={seat.id}
          className={`w-12 h-10 object-contain mx-auto transition-transform duration-300 ${
            isSelected ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="text-[11px] text-price-text mt-1 text-center">₹{seat.price}</div>
      </div>
    );
  };

  const handleContinue = () => {
    if (!isFormComplete) return;
    navigate('/booking-details', {
      state: {
        selectedSeats,
        boardingPoint: boardingPoints[selectedBoardingPoint!],
        droppingPoint: droppingPoints[selectedDropPoint!],
        totalPrice: calculateTotalPrice(),
        duration,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">

        {/* Show Duration */}
        <h2 className="text-lg font-bold mb-4 text-[#3d85c6]">
          Trip Duration: {duration}
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Seats Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
            {seatsVisible && (
              <div className="space-y-6">
                <div className="flex gap-10">
                  {/* LOWER BERTH */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      LOWER BERTH ({lowerBerthSeats.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {lowerBerthSeats.map(seat => (
                        <SeatComponent key={seat.id} seat={seat} />
                      ))}
                    </div>
                  </div>
                  {/* UPPER BERTH */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      UPPER BERTH ({upperBerthSeats.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {upperBerthSeats.map(seat => (
                        <SeatComponent key={seat.id} seat={seat} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Boarding & Drop Points Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Pickup & Drop Points</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Boarding */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">BOARDING POINTS</h3>
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {boardingPoints.map((point, index) => (
                    <div
                      key={index}
                      className={`border rounded p-2 cursor-pointer transition-colors ${
                        selectedBoardingPoint === index
                          ? 'border-primary bg-seat-selected'
                          : 'border-tab-border hover:border-primary'
                      }`}
                      onClick={() => handleBoardingPointSelect(index)}
                    >
                      <div className="font-medium text-xs">{point.time}</div>
                      <div className="font-semibold text-sm">{point.name}</div>
                      <div className="text-xs text-pickup-text mt-1">{point.address}</div>
                      <div className="text-xs text-pickup-text">{point.contact}</div>
                      <div className="text-xs text-pickup-text">{point.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dropping */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">DROP POINTS</h3>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {droppingPoints.map((point, index) => (
                    <div
                      key={index}
                      className={`border rounded p-2 cursor-pointer transition-colors ${
                        selectedDropPoint === index
                          ? 'border-primary bg-seat-selected'
                          : 'border-tab-border hover:border-primary'
                      }`}
                      onClick={() => handleDropPointSelect(index)}
                    >
                      <div className="font-medium text-xs">{point.time}</div>
                      <div className="font-semibold text-sm">{point.name}</div>
                      <div className="text-xs text-pickup-text mt-1">{point.address}</div>
                      <div className="text-xs text-pickup-text">{point.contact}</div>
                      <div className="text-xs text-pickup-text">{point.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-tab-border pt-4 mt-4">
              <Button
                className="w-full"
                disabled={!isFormComplete}
                size="lg"
                onClick={handleContinue}
              >
                CONTINUE
              </Button>
            </div>
          </div>
        </div>

        {/* Selected Seat Summary */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Know your seats</h2>
          <div className="text-center py-8 text-muted-foreground">
            {selectedSeats.length > 0 ? (
              <div>
                <p className="mb-2">Selected Seats:</p>
                <div className="space-y-1">
                  {selectedSeats.map(seatId => {
                    const seat = allSeats.find(s => s.id === seatId);
                    return (
                      <div key={seatId} className="text-sm">
                        {seatId} - ₹{seat?.price}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-3 bg-muted rounded">
                  <div className="font-semibold text-lg">Total: ₹{calculateTotalPrice()}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                  </div>
                </div>
              </div>
            ) : (
              <p>Select a seat to see details</p>
            )}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredSeat && (
          <div
            className="fixed z-[9999] w-48 bg-[#3D85C6] border border-gray-300 rounded shadow-lg p-3 text-xs text-[#FFFFFF]"
            style={{ top: hoveredSeat.y, left: hoveredSeat.x + 20 }}
          >
            {!hoveredSeat.seat.isAvailable ? (
              <div className="text-center font-bold text-lg">Booked</div>
            ) : (
              <>
                <div className="text-center text-xl font-bold">
                  {hoveredSeat.seat.id === femaleSeatId ? 'Female Seat' : 'Seat Details'}
                </div>
                <div>
                  <span className="font-semibold">Seat No:</span> {hoveredSeat.seat.id}
                </div>
                <div>
                  <span className="font-semibold">Seat Type:</span> {hoveredSeat.seat.type}
                </div>
                <div>
                  <span className="font-semibold">Base Fare:</span> ₹{hoveredSeat.seat.price}
                </div>
                <div>
                  <span className="font-semibold">Discount:</span> ₹
                  {Math.floor(hoveredSeat.seat.price * 0.1)}
                </div>
                <div>
                  <span className="font-semibold">Net Base Fare:</span> ₹
                  {hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)}
                </div>
                <div>
                  <span className="font-semibold">GST:</span> ₹
                  {Math.floor(
                    (hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)) * 0.18,
                  )}
                </div>
                <div className="font-bold mt-1">
                  <span>Total:</span> ₹
                  {Math.floor(
                    (hoveredSeat.seat.price - Math.floor(hoveredSeat.seat.price * 0.1)) * 1.18,
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusLayout;








// below is with seat , price logic but diff design
// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface Seat {
//   id: string;
//   price: number;
//   isAvailable: boolean;
//   isSelected: boolean;
//   type: 'seater' | 'sleeper';
// }

// const BusLayout = () => {
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [hoveredSeat, setHoveredSeat] = useState<{ seat: Seat; x: number; y: number } | null>(null);
//   const [seatsVisible, setSeatsVisible] = useState(true);
//   const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<number | null>(null);
//   const [selectedDropPoint, setSelectedDropPoint] = useState<number | null>(null);

//   const navigate = useNavigate();

//   const lowerBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
//     id: `L${i + 1}`,
//     price: 599 + (i % 6) * 100,
//     isAvailable: i % 3 !== 0 ? true : false,
//     isSelected: false,
//     type: i < 12 ? 'seater' : 'sleeper'
//   }));

//   const upperBerthSeats: Seat[] = Array.from({ length: 18 }, (_, i) => ({
//     id: `U${i + 1}`,
//     price: 699 + (i % 6) * 100,
//     isAvailable: i % 4 !== 0 ? true : false,
//     isSelected: false,
//     type: i < 12 ? 'seater' : 'sleeper'
//   }));

//   const [femaleSeatId] = useState(() => {
//     const availableSeats = lowerBerthSeats.concat(upperBerthSeats).filter(s => s.isAvailable);
//     const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
//     return randomSeat.id;
//   });

//   const handleSeatClick = (seatId: string) => {
//     if (!allSeats.find(s => s.id === seatId)?.isAvailable) return;
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter(id => id !== seatId));
//     } else {
//       setSelectedSeats([...selectedSeats, seatId]);
//     }
//   };

//   const handleBoardingPointSelect = (index: number) => {
//     setSelectedBoardingPoint(index);
//   };

//   const handleDropPointSelect = (index: number) => {
//     setSelectedDropPoint(index);
//   };

//   const calculateTotalPrice = () => {
//     return selectedSeats.reduce((total, seatId) => {
//       const seat = allSeats.find(s => s.id === seatId);
//       return total + (seat?.price || 0);
//     }, 0);
//   };

//   const isFormComplete = selectedSeats.length > 0 && selectedBoardingPoint !== null && selectedDropPoint !== null;

//   const boardingPoints = [
//     { time: '21:15, 06 SEP', name: 'Morigate', address: 'Shop no A-5 morigate golchakkar mother dairy infront of dispensary', contact: '8604875557', phone: '9319121024' },
//     { time: '21:30, 06 SEP', name: 'ISBT Kashmiri Gate', address: 'Morigate golchakkar', contact: '8604875557', phone: '9044266660' },
//     { time: '22:00, 06 SEP', name: 'Akshardham Metro Station', address: 'Yamuna bank metro Station', contact: '8604875557', phone: '9044266660' },
//     { time: '22:30, 06 SEP', name: 'NOIDA 0 POINT NEAR PARICHOUK', address: 'NOIDA 0 POINT', contact: '8604875557', phone: '9044266660' }
//   ];

//   const droppingPoints = [
//     { time: '03:45, 07 SEP', name: 'Kanpur', address: 'Ramadevi Chauraha Kanpur', contact: '7439049009', phone: '7408713009' }
//   ];

//   const allSeats = [...lowerBerthSeats, ...upperBerthSeats];

//   const handleContinue = () => {
//     if (!isFormComplete) return;
//     navigate("/booking-details", {
//       state: {
//         selectedSeats,
//         boardingPoint: boardingPoints[selectedBoardingPoint!],
//         droppingPoint: droppingPoints[selectedDropPoint!],
//         totalPrice: calculateTotalPrice()
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="grid grid-cols-2 gap-8">
//           {/* Seats Section */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-lg font-semibold">Select Seats</h2>
//               <button onClick={() => setSeatsVisible(!seatsVisible)} className="text-sm flex items-center">
//                 {seatsVisible ? <>Hide <ChevronUp className="w-4 h-4 ml-1" /></> : <>Show <ChevronDown className="w-4 h-4 ml-1" /></>}
//               </button>
//             </div>
//             {seatsVisible && (
//               <div className="space-y-6">
//                 {/* Lower Berth */}
//                 <div>
//                   <h3 className="font-medium mb-2">Lower Berth</h3>
//                   <div className="grid grid-cols-6 gap-2">
//                     {lowerBerthSeats.map((seat) => (
//                       <div
//                         key={seat.id}
//                         className={`p-2 border rounded cursor-pointer text-center text-sm 
//                           ${!seat.isAvailable ? 'bg-gray-300 cursor-not-allowed' : selectedSeats.includes(seat.id) ? 'bg-green-500 text-white' : 'bg-white'}
//                           ${seat.id === femaleSeatId ? 'border-pink-500' : ''}`}
//                         onClick={() => handleSeatClick(seat.id)}
//                         onMouseEnter={(e) => setHoveredSeat({ seat, x: e.clientX, y: e.clientY })}
//                         onMouseLeave={() => setHoveredSeat(null)}
//                       >
//                         {seat.id}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Upper Berth */}
//                 <div>
//                   <h3 className="font-medium mb-2">Upper Berth</h3>
//                   <div className="grid grid-cols-6 gap-2">
//                     {upperBerthSeats.map((seat) => (
//                       <div
//                         key={seat.id}
//                         className={`p-2 border rounded cursor-pointer text-center text-sm 
//                           ${!seat.isAvailable ? 'bg-gray-300 cursor-not-allowed' : selectedSeats.includes(seat.id) ? 'bg-green-500 text-white' : 'bg-white'}
//                           ${seat.id === femaleSeatId ? 'border-pink-500' : ''}`}
//                         onClick={() => handleSeatClick(seat.id)}
//                         onMouseEnter={(e) => setHoveredSeat({ seat, x: e.clientX, y: e.clientY })}
//                         onMouseLeave={() => setHoveredSeat(null)}
//                       >
//                         {seat.id}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Boarding & Drop Points Section */}
//           <div>
//             <h2 className="text-lg font-semibold mb-4">Select Pickup & Drop Points</h2>
//             <div className="space-y-4">
//               {/* Boarding */}
//               <div>
//                 <h3 className="font-medium">Boarding Point</h3>
//                 {boardingPoints.map((point, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => handleBoardingPointSelect(idx)}
//                     className={`p-2 border rounded mb-2 cursor-pointer ${selectedBoardingPoint === idx ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
//                   >
//                     <div className="text-sm font-semibold">{point.time} - {point.name}</div>
//                     <div className="text-xs text-gray-600">{point.address}</div>
//                     <div className="text-xs">Ph: {point.phone}</div>
//                   </div>
//                 ))}
//               </div>
//               {/* Dropping */}
//               <div>
//                 <h3 className="font-medium">Dropping Point</h3>
//                 {droppingPoints.map((point, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => handleDropPointSelect(idx)}
//                     className={`p-2 border rounded mb-2 cursor-pointer ${selectedDropPoint === idx ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
//                   >
//                     <div className="text-sm font-semibold">{point.time} - {point.name}</div>
//                     <div className="text-xs text-gray-600">{point.address}</div>
//                     <div className="text-xs">Ph: {point.phone}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t border-tab-border pt-4 mt-4">
//               <Button
//                 className="w-full"
//                 disabled={!isFormComplete}
//                 size="lg"
//                 onClick={handleContinue}
//               >
//                 CONTINUE
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Selected Seat Summary */}
//         <div className="mt-8 p-4 border rounded bg-white">
//           <h2 className="text-lg font-semibold mb-4">Selected Seats</h2>
//           {selectedSeats.length === 0 ? (
//             <p className="text-gray-500 text-sm">No seats selected</p>
//           ) : (
//             <ul className="space-y-2">
//               {selectedSeats.map((seatId) => {
//                 const seat = allSeats.find((s) => s.id === seatId)!;
//                 return (
//                   <li key={seatId} className="flex justify-between text-sm">
//                     <span>
//                       {seat.id} - ₹{seat.price}
//                       {seat.id === femaleSeatId && (
//                         <span className="ml-2 text-pink-600 font-medium">(Female Seat)</span>
//                       )}
//                     </span>
//                     <span>Type: {seat.type}</span>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//           <div className="mt-4 font-semibold">Total: ₹{calculateTotalPrice()}</div>
//         </div>
//       </div>

//       {/* Tooltip */}
//       {hoveredSeat && (
//         <div
//           className="absolute bg-black text-white text-xs px-2 py-1 rounded"
//           style={{ top: hoveredSeat.y + 10, left: hoveredSeat.x + 10 }}
//         >
//           {hoveredSeat.seat.id} - ₹{hoveredSeat.seat.price} ({hoveredSeat.seat.type})
//           {hoveredSeat.seat.id === femaleSeatId && " | Reserved for Female"}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BusLayout;
