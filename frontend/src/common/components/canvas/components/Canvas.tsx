import CursorLayer from '@/common/components/cursor/CursorLayer';
import WidgetLayer from '@/common/components/widgetFrame/WidgetLayer';
import WidgetEditingPreviewLayer from '@/common/components/widgetFrame/WidgetEditingPreviewLayer';
import { CanvasProvider } from '@/common/components/canvas/context/CanvasProvider';
import ZoomControls from '@/common/components/canvas/components/ZoomControls';
import { CanvasWrapper } from './CanvasWrapper';

function CanvasContent() {
  return (
    <CanvasWrapper>
      {/* 위젯 렌더링 */}
      <WidgetLayer />
      {/* 다른 유저의 드래그/리사이즈 프리뷰 */}
      <WidgetEditingPreviewLayer />
      {/* 커서 렌더링 */}
      <CursorLayer />
    </CanvasWrapper>
  );
}

function Canvas() {
  return (
    <CanvasProvider>
      <CanvasContent />
      <ZoomControls />
    </CanvasProvider>
  );
}

export default Canvas;
