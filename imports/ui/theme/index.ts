import { colors } from './color';
import { grid } from './grid';

export type Theme = Readonly<Partial<typeof global> & (typeof dark | typeof light)>;
export type ThemeVariant = 'dark' | 'light';

const dark = {
  name: 'dark',
  color: {...colors.dark},
};

const light = {
  name: 'light',
  color: {...colors.light},
};

const global = {
  grid: {...grid},
};

export const themes = {
  global: {...global},
  dark: {...dark},
  light: {...light},
};

export { mq } from './media';
