import * as React from 'react';
import { BreakpointProvider } from '../../Breakpoint';
import { ThemeProvider } from 'emotion-theming';
import { GlobalStyles, themes, breakpoints } from '../theme';

// components
import { Header } from '../components/Header';
import { PageRouter } from '../components/navigation';

// pages
import {
  IndexPage,
  AboutPage,
  ServicesPage,
  ContactPage,
  QuotePage,
  NotFoundPage
} from '../pages';

export const App = () => {
  const [ theme, setTheme ] = React.useState(themes.default);
  React.useLayoutEffect(() => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');

    const changeTheme = () => {
      setTheme(dark.matches ? themes.dark : themes.default);
    };

    // update the theme based on the user's preference
    dark.addListener(changeTheme);
    changeTheme();

    return () => {
      // cleanup
      dark.removeListener(changeTheme);
    };
  }, []);

  return (
    <BreakpointProvider breakpoints={breakpoints}>
      <GlobalStyles/>
      <ThemeProvider theme={theme}>
          <Header/>
          <PageRouter>
            <IndexPage path="/"/>
            <AboutPage path="/about/*"/>
            <ServicesPage path="/services/*"/>
            <ContactPage path="/contact"/>
            <QuotePage path="/quote"/>
            <NotFoundPage default/>
          </PageRouter>
      </ThemeProvider>
    </BreakpointProvider>
  );
};
