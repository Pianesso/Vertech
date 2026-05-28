import { useState, useEffect, useMemo } from "react";
import { FloorControl } from "./components/FloorControl";
import { FloorsOverview } from "./components/FloorsOverview";
import { SystemStats } from "./components/SystemStats";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Button } from "./components/ui/button";
import { LayoutGrid, Layers } from "lucide-react";
import vertechLogo from "../imports/WhatsApp_Image_2026-05-25_at_11.09.09.jpeg";

interface FloorData {
  floor: number;
  temperature: number;
  humidity: number;
  isActive: boolean;
}

export default function App() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"overview" | "detail">("overview");

  // Dados simulados para cada andar
  const [floorsData, setFloorsData] = useState<FloorData[]>([
    { floor: 1, temperature: 24, humidity: 65, isActive: true },
    { floor: 2, temperature: 22, humidity: 70, isActive: true },
    { floor: 3, temperature: 26, humidity: 60, isActive: false },
  ]);

  const handleSelectFloor = (floor: number) => {
    setSelectedFloor(floor);
    setViewMode("detail");
  };

  useEffect(() => {
    // Simular variação de temperatura para cada andar
    const interval = setInterval(() => {
      setFloorsData(prev => prev.map(floor => ({
        ...floor,
        temperature: Math.round((floor.temperature + (Math.random() - 0.5) * 0.5) * 10) / 10,
        humidity: Math.round(Math.max(40, Math.min(80, floor.humidity + (Math.random() - 0.5) * 2))),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentFloor = selectedFloor ? floorsData.find(f => f.floor === selectedFloor) : null;

  // Calculate system statistics
  const stats = useMemo(() => {
    const activeFloors = floorsData.filter(f => f.isActive).length;
    const avgTemperature = floorsData.reduce((sum, f) => sum + f.temperature, 0) / floorsData.length;
    const avgHumidity = floorsData.reduce((sum, f) => sum + f.humidity, 0) / floorsData.length;

    return {
      totalFloors: floorsData.length,
      activeFloors,
      avgTemperature,
      avgHumidity,
    };
  }, [floorsData]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src={vertechLogo}
              alt="Vertech Logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(163,255,0,0.3)]">
                Estufa Vertech
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema de Monitoramento e Controle
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* View Mode Selector */}
        <div className="mb-6 flex gap-3 justify-center items-center">
          <Button
            onClick={() => setViewMode("overview")}
            variant={viewMode === "overview" ? "default" : "outline"}
            className={`min-w-[140px] ${
              viewMode === "overview"
                ? 'shadow-[0_0_20px_rgba(163,255,0,0.5)] border-primary'
                : 'border-border/50 hover:border-primary/50'
            }`}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Visão Geral
          </Button>

          {viewMode === "detail" && currentFloor && (
            <>
              <div className="w-px h-8 bg-border/50" />
              {floorsData.map((floor) => (
                <Button
                  key={floor.floor}
                  onClick={() => handleSelectFloor(floor.floor)}
                  variant={selectedFloor === floor.floor ? "default" : "outline"}
                  className={`min-w-[100px] ${
                    selectedFloor === floor.floor
                      ? 'shadow-[0_0_20px_rgba(163,255,0,0.5)] border-primary'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Andar {floor.floor}
                </Button>
              ))}
            </>
          )}
        </div>

        {/* System Statistics */}
        {viewMode === "overview" && (
          <SystemStats
            totalFloors={stats.totalFloors}
            activeFloors={stats.activeFloors}
            avgTemperature={stats.avgTemperature}
            avgHumidity={stats.avgHumidity}
          />
        )}

        {/* Content based on view mode */}
        {viewMode === "overview" ? (
          <FloorsOverview floors={floorsData} onSelectFloor={handleSelectFloor} />
        ) : currentFloor ? (
          <FloorControl
            floor={currentFloor.floor}
            temperature={currentFloor.temperature}
            humidity={currentFloor.humidity}
            isActive={currentFloor.isActive}
          />
        ) : null}
      </main>
    </div>
  );
}
