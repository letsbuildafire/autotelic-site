import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// components
import { Button, Props } from './Button';

export const style = (props: Partial<Props>) => css`
  background: none;

  min-width: 8rem;

  color: ${props.theme.color[props.variant].body};

  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { ref, children, theme, className, type, ...rest } = props;
  return (
    <Button innerRef={ref} type={type} className={style(props)} {...rest}>{children}</Button>
  );
};
Element.displayName = 'FlatButton';

export const FlatButton = withTheme<Props, Theme>(Element);
FlatButton.defaultProps = {
  type: 'button',
  variant: 'dark',
};
