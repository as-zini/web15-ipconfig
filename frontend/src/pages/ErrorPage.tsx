import { useLocation, useNavigate } from 'react-router';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

type ErrorState =
  | {
      title?: string;
      message?: string;
      status?: number;
    }
  | undefined
  | null;

function ErrorPage() {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-slate-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_#22c55e1f,_transparent_60%),radial-gradient(circle_at_bottom,_#3b82f61f,_transparent_60%)]" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 ring-1 ring-red-500/40">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
              ERROR
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-50">
              {title}
            </h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line text-slate-300">
          {message}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,197,94,0.35)] transition hover:bg-green-400 focus-visible:ring-2 focus-visible:ring-green-400/80 focus-visible:outline-none"
          >
            <Home className="h-4 w-4" />
            홈으로 돌아가기
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-500/80 focus-visible:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            이전 화면으로
          </button>
        </div>

        {state?.status && (
          <p className="mt-4 text-xs text-slate-500">
            오류 코드: <span className="font-mono">{state.status}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
