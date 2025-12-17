import { LuLayers, LuTrash2 } from 'react-icons/lu';
import SearchBar from './SearchBar';

export default function TechStackModal() {
  return (
    <div className="w-[400px] cursor-auto rounded-xl border border-gray-700 bg-gray-800 p-5">
      <WidgetHeader
        title="Tech Stack"
        icon={<LuLayers className="text-purple-400" size={18} />}
        onRemove={() => {}}
      />
      <SearchBar />
      <div className="grid grid-cols-4 gap-3"></div>
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
