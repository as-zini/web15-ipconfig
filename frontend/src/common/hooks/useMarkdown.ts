import { useState, useCallback } from 'react';
import { markdownApi } from '../api/markdownApi';

interface UseMarkdownReturn {
  markdown: string;
  fetchMarkdown: (workspaceId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * 마크다운 문서를 가져오고 관리하는 hook
 */
export const useMarkdown = (): UseMarkdownReturn => {
  const [markdown, setMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkdown = useCallback(async (workspaceId: string) => {
    setIsLoading(true);
    try {
      const markdownData = await markdownApi.getMarkdown(workspaceId);
      setMarkdown(markdownData);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    markdown,
    fetchMarkdown,
    isLoading,
    error,
  };
};
