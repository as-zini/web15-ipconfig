import { useState } from 'react';
import { toast } from 'sonner';

const TIMER_DURATION = 2000;

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      // 2초 후 복사 상태 초기화
      setTimeout(() => setIsCopied(false), TIMER_DURATION);
    } catch (err) {
      toast.error('마크다운 복사에 실패했어요.', {
        description: (err as Error).message,
      });
    }
  };

  return { isCopied, handleCopyToClipboard };
}
