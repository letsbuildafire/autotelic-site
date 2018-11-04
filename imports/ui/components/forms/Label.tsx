import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../../theme';

type Props = {
  readonly children: React.ReactNode,
  readonly error?: boolean,
  readonly theme?: Theme,
} & React.HTMLProps<HTMLLabelElement>;

const style = (props: Partial<Props>) => css`
  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props) => {
  const { children, error, theme, ...rest} = props;
  return (
    <label className={style(props)} {...rest}>{children}</label>
  );
};
Element.displayName = 'Label';

export const Label = withTheme<Props, Theme>(Element);
