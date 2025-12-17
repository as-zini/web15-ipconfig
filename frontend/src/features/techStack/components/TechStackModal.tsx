import { LuLayers, LuTrash2 } from 'react-icons/lu';
import SearchBar from './SearchBar';
import TechLabel from './TeckLabel';
import { TECH_STACKS } from '../constant/techStackInfo';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import NoContents from './NoContents';

export default function TechStackModal() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  return (
    <div className="flex h-[80vh] w-[400px] cursor-auto flex-col rounded-xl border border-gray-700 bg-gray-800 p-5">
      <WidgetHeader
        title="Tech Stack"
        icon={<LuLayers className="text-purple-400" size={18} />}
        onRemove={() => {}}
      />
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-wrap gap-2 overflow-y-auto">
        {TECH_STACKS.filter((te) =>
          te.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        ).map((te) => (
          <TechLabel key={te.name} techName={te.name} />
        ))}
        {TECH_STACKS.filter((te) =>
          te.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        ).length === 0 && <NoContents />}
      </div>
    </div>
  );
}

interface WidgetHeaderProps {
  title: string;
  icon: React.ReactNode;
  onRemove: () => void;
}
const WidgetHeader = ({ title, icon, onRemove }: WidgetHeaderProps) => (
  <div className="mb-4 flex items-center justify-between border-b border-gray-700 pb-2 select-none">
    <h4 className="flex items-center gap-2 font-bold text-white">
      {icon} {title}
    </h4>
    <button
      onMouseDown={(e) => e.stopPropagation()}
      onClick={onRemove}
      className="text-gray-500 transition-colors hover:text-red-400"
    >
      <LuTrash2 size={16} />
    </button>
  </div>
);
