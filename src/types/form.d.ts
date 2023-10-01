interface Col {
  text: string;
  model: string;
  value?: unknown;
  placeholder?: string;
}
export interface NormalCol extends Col {
  type?: 'switch' | 'textarea' | 'number';
}
export interface OptCol extends Col {
  type: 'select' | 'radio';
  options: {
    text: string;
    value: unknown;
  }[];
}
export interface CheckboxCol extends Col {
  type: 'checkbox';
  options: {
    text: string;
    value: unknown;
  }[];
  value?: boolean[];
}
export interface DateCol extends Col {
  type: 'date';
  value?: string[];
}
export interface MarkdownCol extends Col {
  type: 'markdown';
}

export type FormCol = NormalCol | OptCol | CheckboxCol | DateCol | MarkdownCol;