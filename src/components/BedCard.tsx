import { Bed } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export type BedStatus = "available" | "occupied" | "reserved" | "maintenance";

interface BedCardProps {
  bedNumber: string;
  ward: string;
  status: BedStatus;
  patientName?: string;
  admissionTime?: string;
}

const statusConfig = {
  available: {
    color: "bg-success",
    textColor: "text-success",
    bgColor: "bg-success/10",
    label: "Available",
  },
  occupied: {
    color: "bg-destructive",
    textColor: "text-destructive",
    bgColor: "bg-destructive/10",
    label: "Occupied",
  },
  reserved: {
    color: "bg-warning",
    textColor: "text-warning",
    bgColor: "bg-warning/10",
    label: "Reserved",
  },
  maintenance: {
    color: "bg-muted",
    textColor: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "Maintenance",
  },
};

const BedCard = ({ bedNumber, ward, status, patientName, admissionTime }: BedCardProps) => {
  const config = statusConfig[status];

  return (
    <Card className="p-4 transition-smooth hover:scale-105 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <Bed className={`w-5 h-5 ${config.textColor}`} />
          </div>
          <div>
            <h4 className="font-semibold text-lg">{bedNumber}</h4>
            <p className="text-sm text-muted-foreground">{ward}</p>
          </div>
        </div>
        <Badge className={config.color}>{config.label}</Badge>
      </div>
      
      {status === "occupied" && patientName && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-sm font-medium">Patient: {patientName}</p>
          {admissionTime && (
            <p className="text-xs text-muted-foreground mt-1">
              Admitted: {admissionTime}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default BedCard;
