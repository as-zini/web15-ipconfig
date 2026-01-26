import { useCallback } from 'react';
import { useWidgetIdAndType } from '@/common/components/widgetFrame/context/WidgetContext';
import { useWorkspaceWidgetStore } from '@/common/store/workspace';
import { useShallow } from 'zustand/react/shallow';
import type { TechStackWidgetData } from '../types/TechStackWidgetData';
import {
  updateArrayContentAction,
  updateSelectorPickAction,
} from '@/common/api/yjs/actions/widgetContent';
import type { TechStack } from '../types/techStack';

export default function useTechStackWidget() {
  const { widgetId, type } = useWidgetIdAndType();
  const content = useWorkspaceWidgetStore(
    useShallow(
      (state) =>
        state.widgetList.find((widget) => widget.widgetId === widgetId)
          ?.content,
    ),
  );

  const techStackData = content as TechStackWidgetData;

  // Defaults for safety
  const subject = techStackData?.subject ?? { selectedId: '', options: {} };
  const techItems = techStackData?.techItems ?? [];

  const handleSubjectUpdate = useCallback(
    (newSubject: string) => {
      updateSelectorPickAction(widgetId, type, 'subject', newSubject);
    },
    [widgetId, type],
  );

  const handleTechItemsUpdate = useCallback(
    (newItems: TechStack[]) => {
      updateArrayContentAction(widgetId, type, 'techItems', newItems);
    },
    [widgetId, type],
  );

  return {
    subject,
    techItems,
    handleSubjectUpdate,
    handleTechItemsUpdate,
  };
}
