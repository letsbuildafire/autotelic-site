import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { NavLink, NavLinkProps } from 'react-router-dom';
import { style as button, Props as ButtonProps } from './Button';

export type Props = {
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
} & NavLinkProps;

const style = (props: Partial<Props>) => css`
  ${button({})}
  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { className, children, to, strict, exact } = props;
  return (
    <NavLink className={style(props)} to={to} strict={strict} exact={exact}>{children}</NavLink>
  );
};
Element.displayName = 'NavButton';

export const NavButton = withTheme<Props, Theme>(Element);
NavButton.defaultProps = {
  strict: false,
  exact: true,
};
