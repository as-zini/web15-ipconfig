import { useClipboard } from '@/common/hooks/useClipboard';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/common/components/shadcn/dialog';
import { Button } from '@/common/components/shadcn/button';
import { LuSettings, LuArrowLeft, LuCheck, LuCopy } from 'react-icons/lu';
import { useState } from 'react';
import { useWorkspaceWidgetStore } from '@/common/store/workspace';
import { useShallow } from 'zustand/react/shallow';
import { EXPORT_CONFIGS } from '../constant/ExportConfigs';

export function ExportSettingFilesDialog() {
  const { isCopied, handleCopyToClipboard } = useClipboard();
  // 선택된 설정 파일 ID (null이면 리스트 뷰)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { widgetList } = useWorkspaceWidgetStore(
    useShallow((state) => ({
      widgetList: state.widgetList,
    })),
  );

  // 선택된 설정 정보 및 콘텐츠 생성
  const selectedConfig = EXPORT_CONFIGS.find((c) => c.id === selectedId);
  const content = selectedConfig ? selectedConfig.getContent(widgetList) : '';

  const handleBack = () => {
    setSelectedId(null);
  };

  return (
    <DialogContent className="z-999 sm:max-w-2xl">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <DialogTitle className="flex items-center gap-2">
            <LuSettings size={18} className="text-primary-600" />
            {selectedConfig ? selectedConfig.label : '설정 파일 내보내기'}
          </DialogTitle>
          {/* 상세 뷰일 때 헤더 오른쪽에 뒤로가기 버튼 표시 */}
          {selectedConfig && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8"
              title="목록으로 돌아가기"
            >
              <LuArrowLeft size={18} />
              <span className="sr-only">뒤로가기</span>
            </Button>
          )}
        </div>
        <DialogDescription>
          {selectedConfig
            ? `아래 내용을 ${selectedConfig.fileName} 파일에 복사하여 사용하세요.`
            : '프로젝트 세팅에 필요한 설정 파일을 선택하여 내보낼 수 있습니다.'}
        </DialogDescription>
      </DialogHeader>

      <div className="flex h-[45vh] flex-col overflow-y-auto rounded-lg bg-[#0C1117] px-4 py-3">
        {selectedConfig ? (
          // [Detail View] 설정 파일 내용 표시
          <div className="h-full w-full overflow-auto font-mono text-sm whitespace-pre text-gray-300">
            {content}
          </div>
        ) : (
          // [List View] 내보내기 가능한 항목 리스트 표시
          <div className="flex flex-col gap-2">
            {EXPORT_CONFIGS.map((config) => (
              <Button
                key={config.id}
                variant="ghost"
                className="flex h-auto w-full items-center justify-start gap-4 p-4 hover:bg-white/10"
                onClick={() => setSelectedId(config.id)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800">
                  {config.icon}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-semibold text-white">
                    {config.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {config.description}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      <DialogFooter>
        {selectedConfig && (
          <Button
            variant="secondary"
            onClick={() => handleCopyToClipboard(content)}
          >
            {isCopied ? (
              <LuCheck size={16} className="text-green-500" />
            ) : (
              <LuCopy size={16} />
            )}
            {isCopied ? '복사 완료!' : '복사 하기'}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
