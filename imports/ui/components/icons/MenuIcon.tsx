import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Icon, Props as IconProps, Ref } from './Icon';

export type Props = {
  innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly className?: string,
} & IconProps;

const style = (props: Partial<Props>) => css``;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { innerRef, theme, variant, className, ...rest } = props;

  return (
    <Icon innerRef={innerRef || ref} className={style(props)} {...rest}/>
  );
});

export const MenuIcon = withTheme<Props, Theme>(Element);
MenuIcon.defaultProps = {
  width: {
    xs: 64,
    sm: 48,
    lg: 128,
  },
  height: {
    xs: 64,
    sm: 48,
    lg: 128,
  },
  speed: 1,
};

