import { colors } from './color';
import { grid } from './grid';

const light = {
  is_dark: false,
  colors: { ...colors.light },
  grid: grid,
};

const dark = {
  is_dark: true,
  colors: { ...colors.dark },
  grid: grid,
};

export type Theme = Readonly<typeof light>;
export const themes = {
  default: { ...light },
  dark: { ...dark },
};

export { GlobalStyles } from './GlobalStyles';
export { mq, breakpoints, Breakpoint, BreakpointProps } from './media';
export { default as styled } from './styled';
