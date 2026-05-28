import { Card } from "./ui/card";
import { Activity, Wifi, AlertTriangle, CheckCircle2 } from "lucide-react";

interface SystemStatsProps {
  totalFloors: number;
  activeFloors: number;
  avgTemperature: number;
  avgHumidity: number;
}

export function SystemStats({ totalFloors, activeFloors, avgTemperature, avgHumidity }: SystemStatsProps) {
  const systemHealth = (activeFloors / totalFloors) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* System Status */}
      <Card className="p-4 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${systemHealth === 100 ? 'bg-primary/10 shadow-[0_0_15px_rgba(163,255,0,0.3)]' : 'bg-yellow-500/10'}`}>
            {systemHealth === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-primary" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status do Sistema</p>
            <p className="text-lg font-semibold text-foreground">
              {systemHealth === 100 ? 'Operacional' : 'Atenção'}
            </p>
          </div>
        </div>
      </Card>

      {/* Active Floors */}
      <Card className="p-4 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-secondary/10 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <Wifi className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Andares Online</p>
            <p className="text-lg font-semibold text-foreground">
              {activeFloors} / {totalFloors}
            </p>
          </div>
        </div>
      </Card>

      {/* Average Temperature */}
      <Card className="p-4 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10 shadow-[0_0_15px_rgba(163,255,0,0.3)]">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Temp. Média</p>
            <p className="text-lg font-semibold text-primary">
              {avgTemperature.toFixed(1)}°C
            </p>
          </div>
        </div>
      </Card>

      {/* Average Humidity */}
      <Card className="p-4 border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-secondary/10 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <Activity className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Umidade Média</p>
            <p className="text-lg font-semibold text-secondary">
              {avgHumidity.toFixed(0)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
