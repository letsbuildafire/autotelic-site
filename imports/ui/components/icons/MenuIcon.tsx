import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

// components
import { Icon, Props as IconProps, Ref } from './Icon';

export type Props = {
  innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly className?: string,
} & IconProps;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { innerRef, theme, className, ...rest } = props;

  return (
    <Icon innerRef={innerRef || ref} {...rest}/>
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
