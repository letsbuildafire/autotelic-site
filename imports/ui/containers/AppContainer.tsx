import * as React from 'react';
import { debounce } from 'lodash';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../theme';
import { Breakpoints, getBreakpoint } from '../theme/media';

// containers
import { Header } from '../components/Header';
import { Content } from '../components/Content';

// components
import { Menu } from '../components/navigation/Menu';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  matchPath
} from 'react-router-dom';
import { MenuIcon } from '../components/icons';

// icon data
import {
  menuAboutData,
  menuServicesData,
  menuContactData,
} from '../data/icons';

// global ui components
import { Branding } from '../components/Branding';
import { Eyecatch } from '../components/Eyecatch';

// pages
import { IndexPage } from '../pages/IndexPage';
import { AboutPage } from '../pages/AboutPage';
import { ServicesPage } from '../pages/ServicesPage';
import { ContactPage } from '../pages/ContactPage';

type Props = {};

type State = {
  breakpoint: Breakpoints,
  height: number,
  width: number,
};

export class AppContainer extends React.Component<Props, State> {
  private root: HTMLDivElement;

  constructor(props) {
    super(props);

    this.setViewport = this.setViewport.bind(this);
  }

  componentDidMount() {
      this.root = document.getElementById('app') as HTMLDivElement;

      window.addEventListener('resize', debounce(this.setViewport, 16));
      this.setViewport();
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.setViewport);
  }

  setViewport() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.setState({
      breakpoint: getBreakpoint(width),
      height,
      width,
    });

    this.root.style.height = `${height}px`;
    this.root.style.width = `${width}px`;
  }

  render() {

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route render={({ history, location }) => (
            <>
              <Header>
                <Branding />
                <Menu location={location}>
                  <NavLink to="/about" exact>
                    <MenuIcon speed={2} animationData={menuAboutData} />
                    About
                  </NavLink>
                  <NavLink to="/services" exact>
                    <MenuIcon speed={2} animationData={menuServicesData} />
                    Services
                  </NavLink>
                  <NavLink to="/contact" exact>
                    <MenuIcon speed={2} animationData={menuContactData} />
                    Contact
                  </NavLink>
                </Menu>
              </Header>
              <Content>
                {matchPath(location.pathname, {path: '/', strict: false, exact: true}) && (<IndexPage history={history} location={location} /> )}
                {matchPath(location.pathname, {path: '/about', strict: false, exact: false}) && (<AboutPage history={history}  location={location} /> )}
                {matchPath(location.pathname, {path: '/services', strict: false, exact: false}) && (<ServicesPage history={history} location={location} /> )}
                {matchPath(location.pathname, {path: '/contact', strict: false, exact: false}) && (<ContactPage history={history} location={location} /> )}
              </Content>
            </>
          )}/>
        </Router>
      </ThemeProvider>
    );
  }
}
