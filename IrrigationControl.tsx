import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Droplet, Power, Clock } from "lucide-react";
import { useState } from "react";

interface IrrigationControlProps {
  floor: number;
}

export function IrrigationControl({ floor }: IrrigationControlProps) {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [lastIrrigation, setLastIrrigation] = useState("Há 2 horas");

  const handleManualIrrigation = () => {
    setIsIrrigating(!isIrrigating);
    if (!isIrrigating) {
      setLastIrrigation("Agora");
    }
  };

  return (
    <Card className="p-6 border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-secondary/10 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
          <Droplet className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="font-semibold">Sistema de Irrigação</h3>
          <p className="text-sm text-muted-foreground">
            Controle automático ou manual
          </p>
        </div>
      </div>

      {/* Toggle Automático/Manual */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4 border border-border/30">
        <div className="flex items-center gap-3">
          <Power className={`w-5 h-5 ${isAutomatic ? 'text-primary' : 'text-muted-foreground'}`} />
          <div>
            <Label htmlFor={`irrigation-mode-${floor}`} className="font-medium">
              Modo Automático
            </Label>
            <p className="text-xs text-muted-foreground">
              {isAutomatic ? 'Sistema gerenciado automaticamente' : 'Controle manual ativado'}
            </p>
          </div>
        </div>
        <Switch
          id={`irrigation-mode-${floor}`}
          checked={isAutomatic}
          onCheckedChange={setIsAutomatic}
        />
      </div>

      {/* Controle Manual */}
      {!isAutomatic && (
        <div className="mb-4">
          <Button
            onClick={handleManualIrrigation}
            variant={isIrrigating ? "destructive" : "default"}
            className={`w-full ${!isIrrigating ? 'shadow-[0_0_15px_rgba(163,255,0,0.4)] hover:shadow-[0_0_20px_rgba(163,255,0,0.6)]' : ''}`}
          >
            <Droplet className={`w-4 h-4 mr-2 ${isIrrigating ? 'animate-pulse' : ''}`} />
            {isIrrigating ? 'Parar Irrigação' : 'Iniciar Irrigação'}
          </Button>
        </div>
      )}

      {/* Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-medium ${isIrrigating ? 'text-secondary shadow-[0_0_8px_rgba(0,212,255,0.4)]' : 'text-gray-500'}`}>
            {isIrrigating ? 'Em andamento' : 'Inativo'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Última irrigação:
          </span>
          <span className="font-medium">{lastIrrigation}</span>
        </div>

        {isAutomatic && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Próxima irrigação:</span>
            <span className="font-medium text-primary/80">Em 4 horas</span>
          </div>
        )}
      </div>
    </Card>
  );
}
