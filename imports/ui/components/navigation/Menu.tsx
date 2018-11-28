import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';
import { Location } from 'history';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';
import { Transitionable } from '../../helpers/Transitionable';

// components
import { Item } from '../grid';
import { MenuItem } from './types';
import { Nav, Ref as NavRef } from './Nav';
import { MobileNav, Ref as MobileNavRef } from './MobileNav';
import { NavToggle } from './NavToggle';
import { TweenLite } from 'gsap';

export type Props = {
  readonly children?: MenuItem[] | MenuItem,
  readonly className?: string,
  readonly defaultOpen?: boolean,
  readonly location: Location,
  readonly theme?: Theme,
};

type State = Readonly<typeof initialState>;
const initialState = {
  isOpen: false,
};

const style = (props: Partial<Props>) => css`
  display: flex;
  overflow: visible;

  flex-direction: column;
  flex-wrap: nowrap;

  ${props.className}
`;

class Element extends React.PureComponent<Props, State> {
  public static displayName = 'Menu';
  public static defaultProps: Partial<Props> = {
    defaultOpen: false,
  };
  readonly state: State = initialState;
  private nav = React.createRef<NavRef>();

  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: this.props.defaultOpen || initialState.isOpen,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
  }

  toggleMenu() {
    console.log('toggle');
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log('update');
      this.setState({
        isOpen: false
      });
    }
  }

  showNav(cb) {
    TweenLite.killTweensOf(this.nav.current);
    TweenLite.to(this.nav.current, 0.3, {
      opacity: 1,
      onComplete: cb,
    });
  }

  hideNav(cb) {
    TweenLite.killTweensOf(this.nav.current);
    TweenLite.to(this.nav.current, 0.3, {
      opacity: 0,
      onComplete: cb,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children, ...rest } = this.props;

    return (
      <TransitionGroupPlus
        className={style(this.props)}
        component={Item}
        area="secondary"
        align="center"
        justify={{
          xs: 'end',
          sm: 'start',
        }}
      >
        <NavToggle focused={isOpen} onClick={this.toggleMenu} />
        <Nav>{children}</Nav>
        {isOpen &&
          <Transitionable onEnter={this.showNav} onLeave={this.hideNav} render={(state, props) => (
            <MobileNav onClick={this.toggleMenu} innerRef={this.nav}>{children}</MobileNav>
          )}/>
        }
      </TransitionGroupPlus>
    );
  }
}

export const Menu = withTheme<Props, Theme>(Element);
