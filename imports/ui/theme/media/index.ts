import { BreakpointType } from '../../../Breakpoint';
import { reduce } from 'lodash';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointProps<T> = {[key in Breakpoint]?: T};

export const breakpoints: Array<BreakpointType> = [
  { name: 'xs', min: 0, max: 639 },
  { name: 'sm', min: 640, max: 959 },
  { name: 'md', min: 960, max: 1439 },
  { name: 'lg', min: 1440, max: 1919 },
  { name: 'xl', min: 1920, max: Number.MAX_SAFE_INTEGER },
];

export const mq: BreakpointProps<string> = reduce(breakpoints, (acc, bp) =>
  ({...acc, [bp.name]: `@media (min-width: ${bp.min}px)`})
, {});
