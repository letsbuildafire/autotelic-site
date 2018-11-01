import { css } from 'emotion';
import { entries } from 'lodash';

const MEDIA_QUERY = 'all';

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export const breakpoints: {[key: string]: number} = {
  'xs': 0,
  'sm': 640,
  'md': 960,
  'lg': 1440,
  'xl': 1920,
};

export const mq: {[key: string]: (style) => string} = Object.keys(breakpoints).reduce(
  (accumulator: {[key: string]: (style) => string}, label: string) => {
    const prefix = (typeof breakpoints[label] === 'string') ? '' : 'min-width:';
    const suffix = (typeof breakpoints[label] === 'string') ? '' : 'px';

    accumulator[label] = (style: string) => css`
      @media ${MEDIA_QUERY} and (${prefix + breakpoints[label] + suffix}) {
        ${style};
      }
    `;
    return accumulator;
  },
  {}
);

export const getBreakpoint = (width: number): Breakpoints => {
  const breakpoint = entries(breakpoints).reverse().find(([name, size]) => width > size);
  return breakpoint[0] as Breakpoints;
};
