import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import BedCard, { BedStatus } from "./BedCard";

interface Bed {
  id: string;
  bedNumber: string;
  status: BedStatus;
  patientName?: string;
  admissionTime?: string;
}

interface WardSectionProps {
  wardName: string;
  totalBeds: number;
  availableBeds: number;
  beds: Bed[];
}

const WardSection = ({ wardName, totalBeds, availableBeds, beds }: WardSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const occupancyRate = ((totalBeds - availableBeds) / totalBeds * 100).toFixed(1);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{wardName}</h3>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Total: {totalBeds}</span>
            <span className="text-success">Available: {availableBeds}</span>
            <span>Occupancy: {occupancyRate}%</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      {/* Occupancy Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
          style={{ width: `${occupancyRate}%` }}
        />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {beds.map((bed) => (
            <BedCard key={bed.id} {...bed} ward={wardName} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default WardSection;
