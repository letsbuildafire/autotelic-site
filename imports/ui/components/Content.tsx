import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../theme';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';

type Props = {
  readonly children?: React.ReactNode,
  readonly theme?: Theme,
};

const style = (props: Partial<Props>) => css`
  z-index: 1;
  position: relative;
  height: 100%;
  width: 100%;

  overflow: hidden;
  overflow-y: scroll;

  -webkit-overflow-scrolling: touch;
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { children, theme, ...rest } = props;
  return (
    <TransitionGroupPlus
      transitionMode="out-in"
      className={style(props)}
      component="main"
      {...rest}
    >
      {children}
    </TransitionGroupPlus>
  );
};
Element.displayName = 'Content';

export const Content = withTheme<Props>(Element);
