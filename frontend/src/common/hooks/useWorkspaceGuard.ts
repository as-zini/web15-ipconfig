import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useWorkspaceInfoStore } from '@/common/store/workspace';

export function useWorkspaceGuard(workspaceId: string | undefined) {
  const navigate = useNavigate();
  const setWorkspaceId = useWorkspaceInfoStore((state) => state.setWorkspaceId);

  useEffect(() => {
    if (!workspaceId) {
      navigate('/error', {
        state: {
          status: 400,
          title: '잘못된 접근입니다',
          message:
            '워크스페이스 ID가 없어 페이지를 불러올 수 없습니다.\n처음 화면에서 다시 워크스페이스를 생성하거나 참가해주세요.',
        },
      });
      return;
    }

    const isValidFormat = /^[a-z0-9]{1,32}$/.test(workspaceId);
    if (!isValidFormat) {
      navigate('/error', {
        state: {
          status: 400,
          title: '잘못된 워크스페이스 주소입니다',
          message: `'${workspaceId}' 는 유효하지 않은 워크스페이스 ID입니다.\n영소문자와 숫자만 사용 가능하며, 1~32자 이내여야 합니다.\n처음 화면에서 올바른 코드로 참가해주세요.`,
        },
      });
      return;
    }

    setWorkspaceId(workspaceId);
  }, [workspaceId, navigate, setWorkspaceId]);
}
