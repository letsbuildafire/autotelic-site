import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { MenuItem } from './types';
import { mq } from '../../theme/media';

export type Ref = HTMLElement;

type Props = {
  readonly children?: Array<MenuItem> | MenuItem,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const style = (props: Partial<Props>) => css`
  background: rgba(255, 255, 255, 1);

  height: 100vh;
  width: 100vw;
  overflow: hidden;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  display: none;
  flex-direction: column;
  flex-wrap: nowrap;

  ${mq.sm(css`
    background: none;

    flex-direction: row;

    position: relative;
    top: auto;
    left: auto;

    display: flex;
    height: auto;
    width: auto;
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

  font-size: 0.875rem;
  text-align: center;
  color: darkslategray;

  ${mq.sm(css`
    flex-direction: row;
    margin-right: 24px;

    font-weight: bold;
  `)}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { innerRef, children, ...rest } = props;
  return (
    <nav ref={innerRef} className={style(props)}>
      {children && React.Children.map(children, (c: MenuItem) =>
        React.cloneElement(c, {className: linkStyle(props)})
      )}
    </nav>
  );
};
Element.displayName = 'Nav';

export const Nav = withTheme<Props, Theme>(Element);