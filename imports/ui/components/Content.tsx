import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../theme';

// helpers
import * as TransitionGroupPlus from 'react-transition-group-plus';

type Props = {
  readonly children?: React.ReactNode,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const style = (props: Partial<Props>) => css`
  position: relative;
  height: 100%;
  width: 100%;

  overflow: hidden;
  overflow-y: scroll;

  -webkit-overflow-scrolling: touch;
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { children, theme, variant, ...rest } = props;
  return (
    <TransitionGroupPlus
      className={style(props)}
      component="main"
      transitionMode="out-in"
      {...rest}
    >
      {children}
    </TransitionGroupPlus>
  );
};
Element.displayName = 'Content';
Element.defaultProps = {
  variant: 'dark'
};

export const Content = withTheme<Props>(Element);
