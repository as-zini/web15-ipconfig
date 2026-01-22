import { useEffect, useMemo, useState } from 'react';
import type { LocalState } from '@/common/types/yjsawareness';
import { getProvider } from '@/common/api/yjs/instance';
import useUserStore from '@/common/store/user';
import { useWorkspaceWidgetStore } from '@/common/store/workspace';
import { useShallow } from 'zustand/react/shallow';

type Preview = {
  userId: string;
  nickname: string;
  color: string;
  widgetId: string;
  kind: 'move' | 'resize';
  x: number;
  y: number;
  width?: number;
  height?: number;
};

function WidgetEditingPreviewLayer() {
  const myUserId = useUserStore((s) => s.user?.id);
  const widgetList = useWorkspaceWidgetStore(useShallow((s) => s.widgetList));

  const layoutById = useMemo(() => {
    const map = new Map<string, { width?: number; height?: number }>();
    widgetList.forEach((w) =>
      map.set(w.widgetId, {
        width: w.layout.width,
        height: w.layout.height,
      }),
    );
    return map;
  }, [widgetList]);

  const [previews, setPreviews] = useState<Preview[]>([]);

  useEffect(() => {
    const provider = getProvider();
    if (!provider?.awareness) return;
    const awareness = provider.awareness;

    const recompute = () => {
      console.log('🟢 awareness update fired');
      const next: Preview[] = [];
      const states = awareness.getStates();

      states.forEach((value) => {
        console.log('🔵 raw awareness state', value);
        const state = value as LocalState;
        const user = state.user;
        const editing = state.editing;
        if (!user || !editing) return;
        if (myUserId && user.id === myUserId) return;

        if (editing.kind === 'move') return; // 이동은 WidgetComponent 자체에서 처리

        const fallback = layoutById.get(editing.widgetId);

        next.push({
          userId: user.id,
          nickname: user.nickname,
          color: user.color,
          widgetId: editing.widgetId,
          kind: editing.kind,
          x: editing.preview.x,
          y: editing.preview.y,
          width: editing.preview.width ?? fallback?.width,
          height: editing.preview.height ?? fallback?.height,
        });
      });

      setPreviews(next);
    };

    awareness.on('update', recompute);
    recompute();

    return () => {
      awareness.off('update', recompute);
    };
  }, [myUserId, layoutById]);

  console.log('🟡 previews', previews);

  return (
    <>
      {previews.map((p) => (
        <div
          key={`${p.userId}:${p.widgetId}:${p.kind}`}
          className="pointer-events-none absolute rounded-xl border-2 border-dashed bg-transparent"
          style={{
            left: p.x,
            top: p.y,
            width: p.width ?? 300,
            height: p.height ?? 300,
            borderColor: p.color,
            boxShadow: `0 0 0 2px ${p.color}22`,
            backgroundColor: 'rgba(255,0,0,0.1)',
            zIndex: 9999,
          }}
        >
          <div
            className="absolute -top-6 left-0 rounded-md px-2 py-1 text-xs"
            style={{
              backgroundColor: `${p.color}22`,
              color: p.color,
              border: `1px solid ${p.color}55`,
            }}
          >
            {p.nickname} 이동중
          </div>
        </div>
      ))}
    </>
  );
}

export default WidgetEditingPreviewLayer;
