import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

// components
import { AnimatedIcon, Props as IconProps } from './AnimatedIcon';

export type Props = {
  innerRef?: React.Ref<AnimatedIcon>,
  readonly theme?: Theme,
  readonly className?: string,
} & IconProps;

const Element = React.forwardRef<AnimatedIcon, Props>((props, ref) => {
  const { innerRef, theme, className, ...rest } = props;

  return (
    <AnimatedIcon ref={innerRef} {...rest}/>
  );
});

export const MenuIcon = withTheme<Props, Theme>(Element);
MenuIcon.defaultProps = {
  width: {
    xs: 64,
    sm: 36,
  },
  height: {
    xs: 64,
    sm: 36,
  },
  speed: 1,
};
