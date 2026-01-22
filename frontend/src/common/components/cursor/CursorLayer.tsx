import { useEffect } from 'react';
import { updateLocalCursor } from '@/common/api/yjs/awareness';
import CursorWithName from './CursorWithName';
import useCursorStore from '@/common/store/cursor';
import { useThrottledCallback } from '@/common/hooks/useThrottledCallback';

function CursorLayer() {
  // any 타입 방지를 위해 cursorList만 가져오는 거 명시하기
  const cursorList = useCursorStore((state) => state.cursorList);

  const handleMouseMove = useThrottledCallback((e: MouseEvent) => {
    updateLocalCursor(e.clientX, e.clientY);
  }, 50);

  useEffect(() => {
    // 전체 문서에서 마우스 이동 감지
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {cursorList.map((cursor) => (
        <div
          key={cursor.userId}
          className="pointer-events-none fixed z-[100]"
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CursorWithName
            nickname={cursor.nickname}
            color={cursor.color}
            x={cursor.x}
            y={cursor.y}
          />
        </div>
      ))}
    </>
  );
}

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
export default CursorLayer;
