import { memo, useMemo } from 'react';
import NoContents from './NoContents';
import {
  FRONTEND_TECH_STACKS,
  BACKEND_TECH_STACKS,
  DATABASE_TECH_STACKS,
  INFRASTRUCTURE_TECH_STACKS,
  COMMON_TECH_STACKS,
} from '@/features/widgets/techStack/constant/techStackInfo';
import DraggableTechStackItem from './DraggableTechStackItem';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/common/components/shadcn/accordion';

interface TechStackListProps {
  keyword: string;
}

export function TechStackList({ keyword }: TechStackListProps) {
  const techStacks = [
    ...FRONTEND_TECH_STACKS,
    ...BACKEND_TECH_STACKS,
    ...DATABASE_TECH_STACKS,
    ...INFRASTRUCTURE_TECH_STACKS,
    ...COMMON_TECH_STACKS,
  ];

  const filteredStacks = useMemo(() => {
    const lower = keyword.toLowerCase();
    return FRONTEND_TECH_STACKS.filter((tech) =>
      tech.name.toLowerCase().includes(lower),
    );
  }, [keyword]);

  if (filteredStacks.length === 0) {
    return <NoContents />;
  }

  return (
    <div className="flex flex-wrap gap-2.5 overflow-y-auto py-1">
      {filteredStacks.map((tech) => (
        <Accordion type="single" collapsible>
          <AccordionItem value={tech.id}>
            <AccordionTrigger>{tech.name}</AccordionTrigger>
            <AccordionContent>
              <DraggableTechStackItem key={tech.id} {...tech} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default memo(TechStackList);
