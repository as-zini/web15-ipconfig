import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

export const useCollaboration = (documentName: string) => {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [doc, setDoc] = useState<Y.Doc | null>(null);

  useEffect(() => {
    if (!documentName) return;

    const ydoc = new Y.Doc();
    // 환경 변수 설정은 나중에
    const wsUrl =
      import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3000/collaboration';

    const newProvider = new HocuspocusProvider({
      url: wsUrl,
      name: documentName, // 워크스페이스 ID를 일단 문서 이름으로 사용할게요
      document: ydoc,
    });

    // 동기적으로 호출하면 무한 루프가 발생할 수 있어서 추가했습니다.
    queueMicrotask(() => {
      setDoc(ydoc);
      setProvider(newProvider);
    });

    return () => {
      newProvider.destroy();
      ydoc.destroy();
    };
  }, [documentName]);

  return { provider, doc };
};
