import { colors } from './color';
import { grid } from './grid';

export type Theme = Readonly<typeof dark | typeof light>;
export type ThemeVariant = 'dark' | 'light';

const dark = {
  name: 'dark',
  color: {...colors.dark},
  grid: {...grid},
};

const light = {
  name: 'light',
  color: {...colors.light},
  grid: {...grid},
};

export const themes = {
  dark: {...dark},
  light: {...light},
};

export { mq } from './media';
