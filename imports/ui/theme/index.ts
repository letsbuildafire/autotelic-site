import { color } from './color';
import { grid } from './grid';

export type Theme = Readonly<typeof theme>;
export type ThemeVariant = 'dark' | 'light';

export const theme = {
  color: {...color},
  grid: {...grid},
};
