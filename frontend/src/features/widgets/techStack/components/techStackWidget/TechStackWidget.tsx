import type {
  WidgetContent,
  WidgetData,
  TechStackContentDto,
  MoveWidgetData,
} from '@/common/types/widgetData';
import WidgetShell from '@/common/components/widget/WidgetShell';
import { LuLayers } from 'react-icons/lu';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/components/shadcn/select';
import { Button } from '@/common/components/shadcn/button';
import { SUBJECT_GROUPS } from '@/common/mocks/techStacks';
import { TechStackModal } from '@/features/widgets/techStack/components/modal';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useTechStack } from '@/features/widgets/techStack/hooks/useTechStack';
import SelectedTechStackBox from './SelectedTechStackBox';

interface TechStackWidgetProps {
  widgetId: string;
  data: WidgetData;
  emitUpdateWidget: (widgetId: string, data: WidgetContent) => void;
  emitDeleteWidget: (widgetId: string) => void;
  emitMoveWidget: (widgetId: string, data: MoveWidgetData) => void;
}

function TechStackWidget({
  widgetId,
  data,
  emitUpdateWidget,
  emitDeleteWidget,
  emitMoveWidget,
}: TechStackWidgetProps) {
  const techStackContent = data.content as TechStackContentDto;

  const { selectedTechStacks, isModalOpen, actions } = useTechStack({
    data: techStackContent,
    onDataChange: (nextData) => {
      emitUpdateWidget(widgetId, nextData);
    },
  });

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragEnd={actions.handleDragEnd}
    >
      <WidgetShell
        widgetId={widgetId}
        data={data}
        title="기술 스택"
        icon={<LuLayers className="text-primary" size={18} />}
        emitDeleteWidget={emitDeleteWidget}
        emitMoveWidget={emitMoveWidget}
      >
        <section className="flex flex-col gap-4">
          <Select>
            <div className="flex items-center gap-2 font-bold">
              <div className="shrink-0">주제 :</div>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="논의할 주제를 선택해주세요." />
              </SelectTrigger>
            </div>

            <SelectContent>
              {SUBJECT_GROUPS.map((group) => (
                <SelectGroup key={group.category}>
                  <SelectLabel>{group.category}</SelectLabel>
                  {group.subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>

          <SelectedTechStackBox
            selectedTechStacks={selectedTechStacks}
            setSelectedTechStacks={actions.setSelectedTechStacks}
            setIsTechStackModalOpen={actions.openModal}
          />

          <footer className="flex items-center justify-end gap-2 font-bold">
            <Button variant="secondary">투표</Button>
            <Button>확정</Button>
          </footer>
        </section>
        {isModalOpen && (
          <TechStackModal
            isOpen={isModalOpen}
            onModalClose={actions.closeModal}
          />
        )}
      </WidgetShell>
    </DndContext>
  );
}

export default TechStackWidget;
