import { useState, useCallback } from 'react';
import { markdownApi } from '../api/markdownApi';

interface UseMarkdownReturn {
  markdown: string;
  isLoading: boolean;
  error: Error | null;
  fetchMarkdown: (workspaceId: string) => Promise<void>;
  clearMarkdown: () => void;
}

/**
 * 마크다운 문서를 가져오고 관리하는 hook
 */
export const useMarkdown = (): UseMarkdownReturn => {
  const [markdown, setMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMarkdown = useCallback(async (workspaceId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const markdownData = await markdownApi.getMarkdown(workspaceId);
      setMarkdown(markdownData);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('마크다운 생성에 실패했습니다.');
      setError(error);
      console.error('마크다운 생성 실패:', err);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMarkdown = useCallback(() => {
    setMarkdown('');
    setError(null);
  }, []);

  return {
    markdown,
    isLoading,
    error,
    fetchMarkdown,
    clearMarkdown,
  };
};
