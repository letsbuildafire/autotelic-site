import * as React from 'react';
import { Router, Location, WindowLocation } from '@reach/router';
import { AnimatePresence } from 'framer-motion';
import { styled } from '../../theme';

type Props = { readonly keyBy?: (location: WindowLocation) => string };
export const PageRouter: React.FC<Props> = ({ children, keyBy, ...rest }) => {
  return (
    <Location>
    {({ location }) => (
      <AnimatePresence initial={false} exitBeforeEnter>
        <Router
          component={Main}
          location={location}
          key={keyBy!(location)}
        >
          {children}
        </Router>
      </AnimatePresence>
    )}
    </Location>
  );
};

PageRouter.defaultProps = {
  keyBy: (location) => location.pathname.split('/')[1],
};

const Main = styled.main`
  height: 100%;
  width: 100%;

  background: ${({ theme }) => theme.colors.background};

  position: relative;
`
