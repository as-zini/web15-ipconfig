import CursorWithName from './CursorWithName';
// import useCursorStore from '@/common/store/cursor';
// import { useCursorAwareness } from '@/common/hooks/useCursorAwareness';
import { useOtherUserList } from '@/common/store/user';

function CursorLayer() {
  // Awareness change 이벤트 리스너 등록
  // useCursorAwareness();

  // const cursorList = useCursorStore((state) => state.cursorList);
  const otherUsers = useOtherUserList();

  return (
    <>
      {otherUsers.map(({ id, nickname, color, cursor: { x, y } }) => {
        return (
          <div
            key={id}
            className="pointer-events-none absolute z-[100]"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <CursorWithName nickname={nickname} color={color} x={x} y={y} />
          </div>
        );
      })}
    </>
  );
}

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
export default CursorLayer;
