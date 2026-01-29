import { LuFileJson, LuContainer } from 'react-icons/lu';

export function mappingIcon(type: string) {
  switch (type) {
    case 'prettier':
      return <LuFileJson size={18} className="text-primary-600" />;
    case 'docker':
      return <LuContainer size={18} className="text-primary-600" />;
    default:
      return null;
  }
}
