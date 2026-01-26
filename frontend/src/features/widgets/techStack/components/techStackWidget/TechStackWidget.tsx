import { TechStackModal } from '@/features/widgets/techStack/components/modal';
import { DndContext, pointerWithin } from '@dnd-kit/core';
import { useTechStack } from '@/features/widgets/techStack/hooks/techStackWidget/useTechStack';
import { useMemo } from 'react';
import SelectedTechStackBox from './SelectedTechStackBox';
import SelectInput from '@/common/components/SelectInput';
import SubjectGuideline from './SubjectGuideline';

import useTechStackWidget from '../../hooks/useTechStackWidget';
import WidgetFrame from '@/common/components/widgetFrame/WidgetFrame';
import { LuLayers } from 'react-icons/lu';
import { parseSubject } from '../../utils/parsing';

function TechStackWidget() {
  const { subject, techItems, handleSubjectUpdate, handleTechItemsUpdate } =
    useTechStackWidget();

  const parsedSubject = useMemo(
    () => parseSubject(subject.selectedId),
    [subject.selectedId],
  );

  const { isModalOpen, actions } = useTechStack({
    data: { subject, techItems },
    onDataChange: (nextData) => {
      handleTechItemsUpdate(nextData.techItems);
    },
  });

  return (
    <WidgetFrame
      title="기술 스택"
      icon={<LuLayers className="text-blue-500" />}
    >
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={actions.handleDragEnd}
      >
        <section className="flex w-[450px] flex-col gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="shrink-0">주제 :</div>
            <SelectInput
              selectedValue={subject.selectedId}
              setSelectedValue={handleSubjectUpdate}
            />
          </div>

          {parsedSubject && (
            <SubjectGuideline
              key={`${parsedSubject.category}-${parsedSubject.option}`}
              category={parsedSubject.category}
              option={parsedSubject.option}
            />
          )}

          <SelectedTechStackBox
            selectedTechStacks={techItems}
            setSelectedTechStacks={actions.setSelectedTechStacks}
            setIsTechStackModalOpen={actions.openModal}
          />
        </section>
        {isModalOpen && (
          <TechStackModal
            isOpen={isModalOpen}
            onModalClose={actions.closeModal}
          />
        )}
      </DndContext>
    </WidgetFrame>
  );
}

export default TechStackWidget;
