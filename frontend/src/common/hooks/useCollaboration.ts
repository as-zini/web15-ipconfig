import { useEffect } from 'react';
import { connectProvider, doc } from '../api/yjs/instance';
import { bindYjsToZustand } from '../api/yjs/sync';

export const useCollaboration = (documentName: string) => {
  useEffect(() => {
    if (!documentName) return;

    // 1. 싱글톤 Provider 연결
    const newProvider = connectProvider(documentName);

    // 2. Yjs -> Zustand 데이터 동기화 시작
    const cleanupSync = bindYjsToZustand();

    return () => {
      cleanupSync(); // 동기화 중단
      newProvider.destroy(); // 연결 종료
      doc.destroy();
    };
  }, [documentName]);
};
