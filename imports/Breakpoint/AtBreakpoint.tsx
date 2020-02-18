import * as React from 'react';
import { useBreakpoint } from './Breakpoint';
import { getBreakpoint, DEFAULT_MAX } from './util';

type Props = {
  readonly children: React.ReactNode,
  readonly [key: string]: boolean | string | React.ReactNode,
  readonly up?: boolean,
  readonly down?: boolean,
  readonly only?: boolean,
  readonly query?: string,
};

export const AtBreakpoint: React.FC<Props> = (props) => {
  const { width, current, breakpoints } = useBreakpoint();
  const { children, up, down, only, query, ...rest } = props;
  const breakpoint = Object.keys(rest)[0] as string;

  const modifier = only && 'only' || up && 'up' || down && 'down' || null;

  const shouldRender = () => {
    if ( width === DEFAULT_MAX ) { return false; }

    if (query) {
      return window && window.matchMedia(query).matches;
    } else if (modifier === 'only') {
      return breakpoint === current.name;
    } else if (modifier === 'up') {
      return width >= getBreakpoint(breakpoints, breakpoint).min;
    } else if (modifier === 'down') {
      return width <= getBreakpoint(breakpoints, breakpoint).max;
    }

    return false;
  };

  return shouldRender() ? (
    <>{ children }</>
  ) : null;
};
