import { Card } from "./ui/card";
import { Thermometer } from "lucide-react";

interface TemperatureCardProps {
  temperature: number;
  humidity: number;
}

export function TemperatureCard({ temperature, humidity }: TemperatureCardProps) {
  const getTempColor = (temp: number) => {
    if (temp < 18) return "text-secondary";
    if (temp < 25) return "text-primary";
    if (temp < 30) return "text-yellow-400";
    return "text-destructive";
  };

  const getTempGlow = (temp: number) => {
    if (temp < 18) return "shadow-[0_0_15px_rgba(0,212,255,0.5)]";
    if (temp < 25) return "shadow-[0_0_15px_rgba(163,255,0,0.5)]";
    if (temp < 30) return "shadow-[0_0_15px_rgba(255,168,0,0.5)]";
    return "shadow-[0_0_15px_rgba(255,46,94,0.5)]";
  };

  return (
    <Card className="p-6 border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Temperatura</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-semibold ${getTempColor(temperature)} ${getTempGlow(temperature)}`}>
              {temperature}°C
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Umidade</p>
            <span className="text-2xl font-semibold text-secondary shadow-[0_0_10px_rgba(0,212,255,0.4)]">
              {humidity}%
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-muted/50 ${getTempColor(temperature)}`}>
          <Thermometer className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
