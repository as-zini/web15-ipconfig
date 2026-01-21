export interface NamingConventionData {
  widgetType: 'NAMING_CONVENTION';
  frontend: FrontendNamingConvention;
  backend: BackendNamingConvention;
}

export interface FrontendNamingConvention {
  variable: NamingCase;
  function: NamingCase;
  component: NamingCase;
  constant: NamingCase;
}

export interface BackendNamingConvention {
  variable: NamingCase;
  function: NamingCase;
  class: NamingCase;
  constant: NamingCase;
}

export type NamingCase =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'UPPER_SNAKE_CASE'
  | 'kebab-case'
  | 'none';
