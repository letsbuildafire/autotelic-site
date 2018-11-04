import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';

// components
import { Icon, Props as IconProps, Ref } from './Icon';

export type Props = {
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
} & IconProps;

const style = (props: Partial<Props>) => css`
  height: 130vmin;
  width: 130vmin;
  min-height: 400px;
  min-width: 400px;

  position: absolute;
  top: 100%;
  right: 0;

  z-index: -1;
  transform: translate3d(-10%, -25%, 0);

  color: ${props.theme.color.section_icon};

  ${props.theme.name === 'dark' && `
    opacity: 0.1;
    mix-blend-mode: multiply;
  `}

  ${props.theme.name === 'light' && `
    opacity: 0.3;
    mix-blend-mode: screen;
  `}

  ${mq.sm(css`
    top: 50%;
    right: 50%;

    transform: translate3d(33%, -50%, 0);
  `)}

  ${mq.md(css`
    transform: translate3d(50%, -50%, 0);
  `)}

  ${props.className}
`;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { className, innerRef, theme, ...rest } = props;

  return (
    <Icon innerRef={innerRef || ref} className={style(props)} {...rest}/>
  );
});

export const SectionIcon = withTheme<Props, Theme>(Element);
SectionIcon.defaultProps = {
  speed: 0.75,
};
