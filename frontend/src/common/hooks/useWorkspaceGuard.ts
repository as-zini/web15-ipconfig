import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

import { workspaceApi } from '@/common/api/workspaceApi';
import { useWorkspaceInfoStore } from '@/common/store/workspace';

export function useWorkspaceGuard(workspaceId: string | undefined) {
  const navigate = useNavigate();
  const setWorkspaceId = useWorkspaceInfoStore((state) => state.setWorkspaceId);
  const [isWorkspaceValid, setIsWorkspaceValid] = useState(false);

  useEffect(() => {
    if (!workspaceId) {
      navigate('/error', {
        state: {
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
          title: '잘못된 워크스페이스 주소입니다',
          message: `'${workspaceId}' 는 유효하지 않은 워크스페이스 ID입니다.\n영소문자와 숫자만 사용 가능하며, 1~32자 이내여야 합니다.\n처음 화면에서 올바른 코드로 참가해주세요.`,
        },
      });
      return;
    }

    const checkWorkspace = async () => {
      try {
        await workspaceApi.join(workspaceId);
        setWorkspaceId(workspaceId);
        setIsWorkspaceValid(true);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
          navigate('/error', {
            state: {
              status: 404,
            },
          });
        } else {
          navigate('/error', {
            state: {
              title: '워크스페이스에 접속할 수 없어요',
              message:
                '워크스페이스 정보를 확인하는 중 오류가 발생했습니다.\n잠시 후 다시 시도하거나, 처음 화면에서 다시 접속해주세요.',
            },
          });
        }
      }
    };

    void checkWorkspace();
  }, [workspaceId, navigate, setWorkspaceId]);

  return { isWorkspaceValid };
}
