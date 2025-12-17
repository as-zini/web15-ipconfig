import { TECH_STACKS } from '../constant/techStackInfo';
import NoContents from './NoContents';
import TechLabel from './TeckLabel';

export default function LabelList({ keyword }: { keyword: string }) {
  return (
    <div className="flex flex-wrap gap-2 overflow-y-auto">
      {TECH_STACKS.filter((te) =>
        te.name.toLowerCase().includes(keyword.toLowerCase()),
      ).map((te) => (
        <TechLabel key={te.name} techName={te.name} />
      ))}
      {TECH_STACKS.filter((te) =>
        te.name.toLowerCase().includes(keyword.toLowerCase()),
      ).length === 0 && <NoContents />}
    </div>
  );
}
