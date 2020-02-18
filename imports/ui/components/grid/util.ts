import { Breakpoint, BreakpointProps } from '../../theme';

export const getProperty = (
  rule: string,
  prop: any | BreakpointProps<any>,
  breakpoint: Breakpoint | null
): string => {
  if (breakpoint === null) {
    return (typeof prop !== 'object') ? `${rule}: ${prop};` : '';
  }

  if (typeof prop !== 'object') { return ''; }
  return (prop && breakpoint in prop) ? `${rule}: ${prop[breakpoint]};` : '';
};
