import { useRef, useState } from 'react';

// --- 1. 타입 정의 ---
type WidgetType = {
  id: string;
  type: 'note' | 'image' | 'card';
  x: number;
  y: number;
  content: string;
  color: string;
};

type Camera = {
  x: number;
  y: number;
  z: number; // Scale (1 = 100%)
};

export default function useCanvas() {
  // --- 상태 관리 ---
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, z: 1 });
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  // 드래그/인터랙션 상태
  const [isPanning, setIsPanning] = useState(false);
  const [draggingWidgetId, setDraggingWidgetId] = useState<string | null>(null);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 3. 좌표 계산 헬퍼 함수 ---
  // 화면 좌표(마우스)를 캔버스 내부 좌표(World 좌표)로 변환
  const screenToWorld = (screenX: number, screenY: number) => {
    return {
      x: (screenX - camera.x) / camera.z,
      y: (screenY - camera.y) / camera.z,
    };
  };

  // --- 4. 이벤트 핸들러: 줌 (Wheel) ---
  const handleWheel = (e: React.WheelEvent) => {
    // 트랙패드 핀치 줌 또는 마우스 휠
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSensitivity = 0.001;
      const zoomDelta = -e.deltaY * zoomSensitivity;
      const newZoom = Math.min(Math.max(camera.z + zoomDelta, 0.1), 5); // 10% ~ 500% 제한

      // 마우스 커서 위치를 기준으로 줌 (Zoom to Point)
      // 공식: NewCam = Mouse - (Mouse - OldCam) * (NewScale / OldScale)
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - camera.x) * (newZoom / camera.z);
      const newY = mouseY - (mouseY - camera.y) * (newZoom / camera.z);

      setCamera({ x: newX, y: newY, z: newZoom });
    } else {
      // 일반 휠은 상하 이동 (Shift 누르면 좌우 이동)
      setCamera((prev) => ({
        ...prev,
        x: prev.x - (e.shiftKey ? e.deltaY : e.deltaX),
        y: prev.y - (e.shiftKey ? e.deltaX : e.deltaY),
      }));
    }
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

  // --- 5. 이벤트 핸들러: 마우스 다운 (Pointer Down) ---
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

  // --- 6. 이벤트 핸들러: 마우스 이동 (Pointer Move) ---
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

  // --- 7. 이벤트 핸들러: 마우스 업 (Pointer Up) ---
  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggingWidgetId(null);
    lastMousePos.current = null;
  };
}
