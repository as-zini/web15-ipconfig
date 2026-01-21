import type {
  NamingCase,
  FrontendNamingConvention,
  BackendNamingConvention,
} from '../types/namingConvention';
import { ConventionRow } from './ConventionRow';

interface ConventionSectionProps {
  category: 'frontend' | 'backend';
  title: string;
  titleColor: string;
  convention: FrontendNamingConvention | BackendNamingConvention;
  onChange: (key: string, value: NamingCase) => void;
  onHover: (key: string) => void;
}

const FRONTEND_FIELDS = ['변수', '함수', '컴포넌트', '상수'] as const;
const BACKEND_FIELDS = ['변수', '함수', '클래스', '상수'] as const;

export function ConventionSection({
  category,
  title,
  titleColor,
  convention,
  onChange,
  onHover,
}: ConventionSectionProps) {
  const fields = category === 'frontend' ? FRONTEND_FIELDS : BACKEND_FIELDS;

  return (
    <section className="mb-4">
      <h3 className={`${titleColor} mb-2 px-2 text-sm font-bold`}>{title}</h3>
      <div className="space-y-1">
        {fields.map((field) => (
          <ConventionRow
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={convention[field as keyof typeof convention] as NamingCase}
            onChange={(v) => onChange(field, v)}
            onHover={() => onHover(field)}
          />
        ))}
      </div>
    </section>
  );
}
