import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';

// components
import { MenuItem } from './types';

export type Ref = HTMLElement;

type Props = {
  readonly children?: Array<MenuItem> | MenuItem,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly onClick?: (...args) => void,
  readonly theme?: Theme,
};

const style = (props: Partial<Props>) => css`
  background: rgba(255, 255, 255, 0.85);

  height: auto;
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  position: fixed;
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;

  color: black;

  &:hover {
    color: teal;
  }

  ${mq.md(css`
    display: none;
  `)}

  ${props.className}
`;

const linkStyle = (props: Partial<Props>) => css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: ${props.theme.grid.gutterWidth / 2}px 0;

  color: inherit;
  font-size: 0.875rem;
  text-align: center;

  transition: color 300ms ease-out;
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { children, innerRef, onClick, ...rest } = props;
  return (
    <nav ref={innerRef} className={style(props)} onClick={onClick}>
      {children && React.Children.map(children, (c: MenuItem) =>
        React.cloneElement(c, {className: linkStyle(props)})
      )}
    </nav>
  );
};
Element.displayName = 'MobileNav';

export const MobileNav = withTheme<Props, Theme>(Element);
