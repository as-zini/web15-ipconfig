import { useParams } from 'react-router';

// Page-specific components
import WorkspaceHeader from './components/header/WorkspaceHeader';
import { Canvas, CanvasProvider } from '@/common/components/canvas';
import ToolBar from './components/toolbar/ToolBar';
import { useCollaboration } from '@/common/hooks/useCollaboration';
import { LoadingSpinner } from '@/common/components/LoadingSpinner';
import { useWorkspaceGuard } from '@/common/hooks/useWorkspaceGuard';

function WorkSpacePage() {
  // Workspace State
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isReady: isWorkspaceReady, userNickname } =
    useWorkspaceGuard(workspaceId);

  useCollaboration(
    isWorkspaceReady && workspaceId ? workspaceId : '',
    userNickname,
  );

  if (!isWorkspaceReady) {
    return <LoadingSpinner />;
  }

  return (
    <CanvasProvider>
      <div className="relative h-screen overflow-hidden bg-transparent text-gray-100">
        {/* 캔버스: 화면 전체 */}
        <WorkspaceHeader />
        <main className="absolute inset-0">
          <Canvas />
        </main>

        {/* HUD 레이어 */}
        <div className="pointer-events-none absolute inset-0 z-40 pt-[var(--header-h)]">
          <div className="pointer-events-auto">
            <div className="absolute top-0 left-0">
              <ToolBar />
            </div>
          </div>
        </div>
      </div>
    </CanvasProvider>
  );
}

export default WorkSpacePage;
