import { SiPrettier } from 'react-icons/si';
import { LuContainer } from 'react-icons/lu';

export function mappingIcon(type: string) {
  switch (type) {
    case 'CODE_FORMAT':
      return <SiPrettier size={18} className="text-primary-600 h-5 w-5" />;
    case 'DOCKER':
      return <LuContainer size={18} className="text-primary-600 h-5 w-5" />;
    default:
      return null;
  }
}
