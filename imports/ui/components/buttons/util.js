import { Theme } from '../../theme';

const DEFAULT_TYPE = 'primary';

export const getColor = (
  { color, theme }: { color?: string, theme: Theme},
  type = DEFAULT_TYPE
) => color || theme.colors.buttons[type];
