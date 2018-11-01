import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

export type Ref = HTMLButtonElement;

export type Props = {
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
} & React.HTMLProps<HTMLButtonElement>;

export const style = (props: Partial<Props>) => css`
  background: linear-gradient(to right, teal, dodgerblue);
  border-radius: 1.75rem;
  border: none;

  min-width: 10rem;
  margin: 0 auto;
  padding: 1rem 2rem;

  color: white;
  font-size: 0.625rem;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;

  &:disabled {
    opacity: 0.3;
  }

  ${props.className}
`;

const Element: React.SFC<Props> = (props: Props, context) => {
  const {
    innerRef,
    children,
    className,
    theme,
    type,
    variant,
    ...rest
  } = props;

  return (
    <button ref={innerRef} type={type} className={style(props)} {...rest}>{children}</button>
  );
};
Element.displayName = 'Button';

export const Button = withTheme<Props, Theme>(Element);
Button.defaultProps = {
  type: 'button',
  variant: 'dark',
};
