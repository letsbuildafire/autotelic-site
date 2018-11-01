import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Icon, Props as IconProps, Ref } from './Icon';

export type Props = {
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly className?: string,
} & IconProps;

const style = (props: Partial<Props>) => css`
  width: 100%;
  height: auto;
  ${props.className}
`;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { innerRef, theme, variant, className, ...rest } = props;

  return (
    <Icon innerRef={innerRef || ref} className={style(props)} {...rest}/>
  );
});

export const SectionIcon = withTheme<Props, Theme>(Element);
SectionIcon.defaultProps = {
  speed: 0.75,
};
