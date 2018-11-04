import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

// components
import { NavLink, NavLinkProps } from 'react-router-dom';
import { style as button, Props as ButtonProps } from './Button';

export type Props = {} & ButtonProps & NavLinkProps;

const style = (props: Partial<Props>) => css`
  ${button(props)}

  ${props.className}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'NavButton';
  public static defaultProps = {
    color: 'teal',
    exact: true,
    strict: false,
  };

  render() {
    const { children, className, exact, strict, to } = this.props;
    return (
      <NavLink className={style(this.props)} to={to} strict={strict} exact={exact}>{children}</NavLink>
    );
  }
}

export const NavButton = withTheme<Props, Theme>(Element);
