import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/shadcn/dialog';
import ExportDocButton from './ExportDocButton';
import { useMarkdown } from '@/common/hooks/useMarkdown';
import { useEffect } from 'react';
import { useWorkspaceInfoStore } from '@/common/store/workspace';
import { LuCopy, LuFileText, LuX } from 'react-icons/lu';
import { Button } from '@/common/components/shadcn/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { SpinnerCustom } from '@/common/components/SpinnerCustom';

function ExportDocModal() {
  const { workspaceId } = useWorkspaceInfoStore();
  const { markdown, isLoading, error, fetchMarkdown } = useMarkdown();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExportDocButton onClick={() => fetchMarkdown(workspaceId)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LuFileText size={18} className="text-primary-600" />
            마크다운으로 내보내기
          </DialogTitle>
          <DialogDescription>
            협의한 그라운드 룰 및 컨벤션을 마크다운으로 내보낼 수 있습니다.{' '}
            <br />
            GitHub 위키나 README에 바로 붙여넣으세요.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-[45vh] items-center justify-center">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <SpinnerCustom />
              <span>불러오는 중...</span>
            </div>
          ) : (
            <pre className="h-full w-full overflow-y-auto rounded-lg bg-[#0C1117] px-4 py-2 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-300">
              {markdown}
            </pre>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(markdown)}
          >
            <LuCopy size={16} /> 복사하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExportDocModal;
