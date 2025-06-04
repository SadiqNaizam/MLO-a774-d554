import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react'; // For typing the icon prop

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon; // Optional icon component
  description?: string; // Optional sub-text or change indicator
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: IconComponent,
  description,
  className,
}) => {
  console.log("Rendering KPICard:", title);
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
export default KPICard;