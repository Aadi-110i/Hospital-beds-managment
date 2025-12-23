import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  colorClass: string;
}

const StatCard = ({ title, value, icon: Icon, trend, colorClass }: StatCardProps) => {
  return (
    <Card className="p-6 transition-smooth hover:scale-105 hover:shadow-lg border-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
          {trend && (
            <p className="text-sm text-muted-foreground mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-4 rounded-full ${colorClass}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
