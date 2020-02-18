import { find, reduceRight } from 'lodash';

export type BreakpointType = {
  readonly name: string,
  readonly min: number,
  readonly max: number,
};

export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = Number.MAX_SAFE_INTEGER;
export const DEFAULT_BREAKPOINT = {
  name: '',
  min: DEFAULT_MIN,
  max: DEFAULT_MAX,
};

export const isBrowser =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined';

export const getWidth = (): number => isBrowser
  ? Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  : DEFAULT_MAX;

export const getBreakpoint = (
  breakpoints: Array<BreakpointType>,
  value: string | number
): BreakpointType => {
  if (typeof value === 'number') {
    return reduceRight(breakpoints, (last, bp) => bp.max >= value ? bp : last, DEFAULT_BREAKPOINT);
  }
  return find(breakpoints, bp => bp.name === value) || DEFAULT_BREAKPOINT;
};
