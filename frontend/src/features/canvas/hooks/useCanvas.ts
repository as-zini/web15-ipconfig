import type { Camera } from '@/common/types/camera';
import { useRef, useState } from 'react';

export default function useCanvas() {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomButton = (delta: number) => {
    setCamera((prev) => {
      const newZoom = Math.min(Math.max(prev.scale + delta, 0.1), 5);
      const container = containerRef.current;
      if (!container) return { ...prev, scale: newZoom };

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 중앙점이 도망가지 않게 잡아당기는 계산
      const newX = centerX - (centerX - prev.x) * (newZoom / prev.scale);
      const newY = centerY - (centerY - prev.y) * (newZoom / prev.scale);

      return { x: newX, y: newY, scale: newZoom };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPanning(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!lastMousePos.current) return;

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    if (isPanning) {
      setCamera((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    lastMousePos.current = null;
  };

  // World 좌표로 변환
  const getMousePosition = (e: React.PointerEvent | React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();

    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const worldX = (canvasX - camera.x) / camera.scale;
    const worldY = (canvasY - camera.y) / camera.scale;

    return { x: worldX, y: worldY };
  };

  return {
    camera,
    handleZoomButton,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isPanning,
    containerRef,
    getMousePosition,
  };
}
