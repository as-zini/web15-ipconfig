import type { Cursor } from '@/common/types/cursor';
import TechStackWidget from '@/features/widgets/techStack/components/TechStackWidget';
import { useEffect, useState } from 'react';
import type { Camera } from './useCanvas';
import CursorWithName from '@/common/components/cursorWithName/cursorWithName';

interface CanvasContainerProps {
  camera: Camera;
  containerRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent) => void;
  handlePointerMove: (e: React.PointerEvent) => void;
  handlePointerUp: () => void;
  isPanning: boolean;
  draggingWidgetId: string | null;
  remoteCursor: Record<string, Cursor>;
}

function CanvasContent({
  camera,
  containerRef,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  isPanning,
  draggingWidgetId,
  remoteCursor,
}: CanvasContainerProps) {
  const [techStackPosition, setTechStackPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      ref={containerRef}
      className={`h-full w-full cursor-${isPanning ? 'grabbing' : draggingWidgetId ? 'grabbing' : 'default'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 배경 패턴 */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          backgroundImage:
            'radial-gradient(rgb(51,65,85) 1px, transparent 1px)',
          backgroundSize: `${20 * camera.z}px ${20 * camera.z}px`,
          backgroundPosition: `${camera.x % (20 * camera.z)}px ${camera.y % (20 * camera.z)}px`,
        }}
      />
      {/* World Container: 실제 변환(Transform)이 일어나는 레이어 */}
      <div
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.z})`,
          transformOrigin: '0 0',
          width: '100%',
          height: '100%',
        }}
        className="relative will-change-transform"
      >
        {/* 위젯 렌더링 */}
        {techStackPosition.x !== 0 && techStackPosition.y !== 0 && (
          <TechStackWidget
            id="tech-stack"
            position={techStackPosition}
            width={200}
            type="tech"
            content="Tech Stack"
          />
        )}
        {/* 커서 렌더링 */}
        {Object.values(remoteCursor).map((cursor) => (
          <div
            key={cursor.userId}
            className="pointer-events-none absolute z-100"
            style={{
              left: cursor.x,
              top: cursor.y,
            }}
          >
            <CursorWithName
              nickname={cursor.nickname}
              color={cursor.color}
              backgroundColor={cursor.backgroundColor}
              x={cursor.x}
              y={cursor.y}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanvasContent;
