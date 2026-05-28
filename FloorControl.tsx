import { Card } from "./ui/card";
import { TemperatureCard } from "./TemperatureCard";
import { IrrigationControl } from "./IrrigationControl";
import { CameraViewer } from "./CameraViewer";
import { Building2 } from "lucide-react";

interface FloorControlProps {
  floor: number;
  temperature: number;
  humidity: number;
  isActive: boolean;
}

export function FloorControl({ floor, temperature, humidity, isActive }: FloorControlProps) {
  return (
    <div className="space-y-6">
      {/* Floor Header */}
      <Card className="p-4 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 shadow-[0_0_15px_rgba(163,255,0,0.3)]">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Andar {floor}
            </h2>
            <p className="text-sm text-muted-foreground">
              Monitoramento e Controle Completo
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-primary animate-pulse shadow-[0_0_10px_rgba(163,255,0,0.6)]' : 'bg-gray-600'}`} />
            <span className="text-sm text-muted-foreground">
              {isActive ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </Card>

      {/* Floor Controls Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Temperature */}
        <div>
          <TemperatureCard temperature={temperature} humidity={humidity} />
        </div>

        {/* Middle Column - Camera */}
        <div className="xl:col-span-2">
          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
            Monitoramento Visual
          </h3>
          <CameraViewer floor={floor} isActive={isActive} />
        </div>
      </div>

      {/* Irrigation Control - Full Width */}
      <div className="mt-6">
        <IrrigationControl floor={floor} />
      </div>
    </div>
  );
}
