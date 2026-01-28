import { useLocation, useNavigate } from 'react-router';
import type { ErrorState } from '@/common/types/errorState';

export function useErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = (location.state as ErrorState) ?? {};

  const title =
    state?.title ??
    (state?.status === 404
      ? '페이지를 찾을 수 없어요'
      : state?.status === 409
        ? '요청을 처리할 수 없어요'
        : '문제가 발생했어요');

  const message =
    state?.message ??
    (state?.status === 404
      ? '요청하신 워크스페이스를 찾을 수 없습니다.\n초대 코드를 다시 확인해주세요.'
      : state?.status === 409
        ? '이미 존재하는 워크스페이스 코드입니다.\n다른 코드를 사용해 다시 시도해주세요.'
        : '예상하지 못한 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.');

  const status = state?.status;

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return {
    title,
    message,
    status,
    handleGoHome,
    handleGoBack,
  };
}
