import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

type Props = {
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
  readonly error?: boolean,
  children: React.ReactNode,
} & React.HTMLProps<HTMLLabelElement>;

const style = (props: Partial<Props>) => css`
  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props) => {
  const { theme, variant, children, error, ...rest} = props;
  return (
    <label className={style(props)} {...rest}>{children}</label>
  );
};
Element.displayName = 'Label';

export const Label = withTheme<Props, Theme>(Element);
