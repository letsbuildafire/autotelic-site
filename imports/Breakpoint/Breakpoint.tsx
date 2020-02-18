import * as React from 'react';
import {
  BreakpointType,
  getWidth,
  getBreakpoint,
  DEFAULT_BREAKPOINT
} from './util';
import { debounce } from 'lodash';

type BreakpointState = {
  width: number,
  current: BreakpointType,
  breakpoints: Array<BreakpointType>
};

type ProviderProps = {
  readonly breakpoints: Array<BreakpointType>,
  readonly children: React.ReactNode,
};

const initialState = {
  width: DEFAULT_BREAKPOINT.max,
  current: DEFAULT_BREAKPOINT,
  breakpoints: [] as Array<BreakpointType>
};

export const BreakpointContext = React.createContext<BreakpointState>(initialState);

export const BreakpointProvider = (props: ProviderProps) => {
  const { breakpoints, children } = props;

  const [ state, setState ] = React.useState<BreakpointState>(initialState);
  React.useEffect(() => {
    const handleResize = () => {
      const width = getWidth();

      setState({
        width,
        breakpoints,
        current: getBreakpoint(breakpoints, width),
      });
    };

    // update context when the viewport changes
    window.addEventListener('resize', debounce(handleResize, 16));
    handleResize();

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(handleResize, 16));
    };
  }, []);

  return (
    <BreakpointContext.Provider value={state}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => React.useContext(BreakpointContext);
