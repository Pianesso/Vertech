import { Card } from "./ui/card";
import { Camera, Maximize2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState } from "react";

interface CameraViewerProps {
  floor: number;
  isActive: boolean;
}

export function CameraViewer({ floor, isActive }: CameraViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const CameraFeed = ({ showExpand = true }: { showExpand?: boolean }) => (
    <div className="relative aspect-video bg-black/90 group overflow-hidden">
      {/* Grid pattern background */}
      {isActive && (
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
      )}

      {/* Simulação de feed de câmera */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Camera className={`w-16 h-16 mx-auto mb-2 ${isActive ? 'text-secondary/40' : 'text-gray-700'}`} />
          <p className="text-sm text-gray-500">
            {isActive ? 'Feed ao Vivo' : 'Câmera Offline'}
          </p>
        </div>
      </div>

      {/* Scan line effect for active cameras */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Overlay de informações */}
      <div className="absolute top-2 left-2 bg-black/80 px-3 py-1.5 rounded border border-secondary/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-xs text-white font-mono">
            {new Date().toLocaleTimeString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Bottom overlay - Floor info */}
      <div className="absolute bottom-2 left-2 bg-black/80 px-3 py-1 rounded border border-primary/30 backdrop-blur-sm">
        <span className="text-xs text-primary font-mono">ANDAR {floor}</span>
      </div>

      {/* Botão de expandir */}
      {showExpand && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border border-secondary/30"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="bg-muted/30 p-3 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Andar {floor}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(163,255,0,0.6)]' : 'bg-gray-600'}`} />
            <span className="text-xs text-muted-foreground">
              {isActive ? 'Ao vivo' : 'Offline'}
            </span>
          </div>
        </div>
        <CameraFeed />
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black/95 border-primary/30">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white border border-secondary/30"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <CameraFeed showExpand={false} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
