import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

// components
import { Button, Props as ButtonProps } from './Button';

type Props = {
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly theme?: Theme,
} & ButtonProps;

const style = (props: Partial<Props>) => css`
  background: none;
  border: 2px solid ${props.theme.color.body};
  color: ${props.theme.color.body};

  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { ref, children, theme, className, type, ...rest } = props;
  return (
    <Button innerRef={ref} type={type} className={style(props)} {...rest}>{children}</Button>
  );
};
Element.displayName = 'OutlineButton';
Element.defaultProps = {
  type: 'button',
};

export const OutlineButton = withTheme<Props, Theme>(Element);
