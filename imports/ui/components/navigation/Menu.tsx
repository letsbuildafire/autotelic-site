import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';
import { Location } from 'history';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';
import { Transitionable } from '../../helpers/Transitionable';
import { mq } from '../../theme/media';

// components
import { Item } from '../grid';
import { MenuItem } from './types';
import { Nav, Ref as NavRef } from './Nav';
import { TweenLite } from 'gsap';

export type Props = {
  readonly children?: MenuItem[] | MenuItem,
  readonly className?: string,
  readonly defaultOpen?: boolean,
  readonly location: Location,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

type State = Readonly<typeof initialState>;
const initialState = {
  isOpen: false,
};

const style = (props: Partial<Props>) => css`
  display: flex;
  padding-left: ${props.theme.grid.gutterWidth / 2}px;
  padding-right: ${props.theme.grid.gutterWidth / 2}px;
  overflow: visible;

  flex-direction: column;
  flex-wrap: nowrap;

  ${props.className}
`;

const toggleStyle = (props: Partial<Props>) => css`
  display: block;
  width: 36px;
  height: 22px;

  align-self: flex-end;

  position: relative;
  margin-top: ${props.theme.grid.gutterWidth / 2}px;
  margin-bottom: ${props.theme.grid.gutterWidth / 2}px;

  span {
    background-color: currentColor;
    border-radius: 4px;

    height: 3px;
    width: 100%;

    position: absolute;
    left: 0;
  }

  span:nth-of-type(1) {
    top: 0;
  }

  span:nth-of-type(2) {
    top: 10px;
  }

  span:nth-of-type(3) {
    bottom: 0;
  }

  ${mq.sm(css`
    display: none;
  `)}
`;

class Element extends React.Component<Props, State> {
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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.location.key !== prevProps.location.key) {
      this.setState({
        isOpen: false
      });
    }
  }

  showNav(cb) {
    TweenLite.from(this.nav.current, 0.3, {
      opacity: 0,
      onComplete: cb,
    });
  }

  hideNav(cb) {
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
        justify="start"
      >
        <a className={toggleStyle(this.props)} onClick={this.toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </a>
        {true &&
          <Transitionable onEnter={this.showNav} onLeave={this.hideNav} render={(state, props) => (
            <Nav innerRef={this.nav}>{children}</Nav>
          )}/>
        }
      </TransitionGroupPlus>
    );
  }
}

export const Menu = withTheme<Props, Theme>(Element);
