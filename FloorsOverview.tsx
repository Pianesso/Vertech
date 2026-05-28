import { Card } from "./ui/card";
import { Thermometer, Droplet, Camera, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface FloorData {
  floor: number;
  temperature: number;
  humidity: number;
  isActive: boolean;
}

interface FloorsOverviewProps {
  floors: FloorData[];
  onSelectFloor: (floor: number) => void;
}

export function FloorsOverview({ floors, onSelectFloor }: FloorsOverviewProps) {
  const getTempColor = (temp: number) => {
    if (temp < 18) return "text-secondary";
    if (temp < 25) return "text-primary";
    if (temp < 30) return "text-yellow-400";
    return "text-destructive";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Visão Geral dos Andares
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floors.map((floor) => (
          <Card
            key={floor.floor}
            className="p-4 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => onSelectFloor(floor.floor)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">Andar {floor.floor}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${floor.isActive ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(163,255,0,0.6)]' : 'bg-gray-600'}`} />
                  <span className="text-xs text-muted-foreground">
                    {floor.isActive ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4 text-primary" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Thermometer className="w-4 h-4" />
                  <span>Temperatura</span>
                </div>
                <span className={`font-semibold ${getTempColor(floor.temperature)}`}>
                  {floor.temperature}°C
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplet className="w-4 h-4" />
                  <span>Umidade</span>
                </div>
                <span className="font-semibold text-secondary">
                  {floor.humidity}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Camera className="w-4 h-4" />
                  <span>Câmera</span>
                </div>
                <span className={`text-xs ${floor.isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {floor.isActive ? 'Ativa' : 'Offline'}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
