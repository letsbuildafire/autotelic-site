import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

// components
import { Button, Props } from './Button';

export const style = (props: Partial<Props>) => css`
  background: none;
  color: ${props.theme.color.body};

  min-width: 8rem;

  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const { children, className, ref, theme, type, ...rest } = props;
  return (
    <Button innerRef={ref} type={type} className={style(props)} {...rest}>{children}</Button>
  );
};
Element.displayName = 'FlatButton';

export const FlatButton = withTheme<Props, Theme>(Element);
FlatButton.defaultProps = {
  type: 'button',
};
