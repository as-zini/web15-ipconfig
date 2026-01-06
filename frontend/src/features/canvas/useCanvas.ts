import { useRef, useState } from 'react';

type WidgetType = {
  id: string;
  type: 'note' | 'image' | 'card';
  x: number;
  y: number;
  content: string;
  color: string;
};

export interface Camera {
  x: number;
  y: number;
  z: number; // Scale (1 = 100%)
}

export default function useCanvas() {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, z: 1 });
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  const [isPanning, setIsPanning] = useState(false);
  const [draggingWidgetId, setDraggingWidgetId] = useState<string | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const screenToWorld = (screenX: number, screenY: number) => {
    return {
      x: (screenX - camera.x) / camera.z,
      y: (screenY - camera.y) / camera.z,
    };
  };

  const handleZoomButton = (delta: number) => {
    setCamera((prev) => {
      // 1. 줌 배율 변경 (0.1 ~ 5 제한)
      const newZoom = Math.min(Math.max(prev.z + delta, 0.1), 5);

      // 2. 화면의 중앙 좌표 구하기 (여기가 마우스 위치 대신 들어감!)
      const container = containerRef.current;
      if (!container) return { ...prev, z: newZoom };

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2; // 화면 너비의 절반
      const centerY = rect.height / 2; // 화면 높이의 절반

      // 3. 줌 공식 적용 (마우스 휠 로직과 동일)
      // "중앙점이 도망가지 않게 잡아당기는 계산"
      const newX = centerX - (centerX - prev.x) * (newZoom / prev.z);
      const newY = centerY - (centerY - prev.y) * (newZoom / prev.z);

      return { x: newX, y: newY, z: newZoom };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;

    // 위젯을 클릭한 경우 -> 위젯 드래그 시작
    const widgetElement = target.closest('[data-widget-id]');
    if (widgetElement) {
      const widgetId = widgetElement.getAttribute('data-widget-id');
      setDraggingWidgetId(widgetId);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      e.stopPropagation();
      return;
    }

    // 빈 공간을 클릭한 경우 -> 캔버스 패닝(이동) 시작
    setIsPanning(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!lastMousePos.current) return;

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    // 6-1. 캔버스 이동
    if (isPanning) {
      setCamera((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    }

    // 6-2. 위젯 이동
    if (draggingWidgetId) {
      // 중요: 화면 이동 거리를 현재 줌 레벨(camera.z)로 나누어야 정확한 위치로 이동됨
      const worldDx = dx / camera.z;
      const worldDy = dy / camera.z;

      setWidgets((prev) =>
        prev.map((w) => {
          if (w.id === draggingWidgetId) {
            const newWidget = { ...w, x: w.x + worldDx, y: w.y + worldDy };
            // [공동 편집 포인트]: 여기서 newWidget 정보를 소켓으로 전송하면 됨
            // socket.emit('update-widget', newWidget);
            return newWidget;
          }
          return w;
        }),
      );
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggingWidgetId(null);
    lastMousePos.current = null;
  };

  return {
    camera,
    widgets,
    handleZoomButton,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    isPanning,
    draggingWidgetId,
    containerRef,
  };
}
