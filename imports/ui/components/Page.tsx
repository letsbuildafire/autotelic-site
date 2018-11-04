import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme } from '../theme';

export type Ref = HTMLElement;

type Props = {
  readonly children?: React.ReactNode,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
} & React.HTMLAttributes<HTMLElement>;

const style = (props: Partial<Props>) => css`
  height: auto;
  min-height: 100%;
  width: 100%;

  color: ${props.theme.color.body};

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  z-index: 1;
  position: relative;

  ${props.className}
`;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { className, children, innerRef, theme, ...rest } = props;

  return (
    <article ref={innerRef || ref} className={style(props)} {...rest}>
      {children}
    </article>
  );
});
Element.displayName = 'Page';

export const Page = withTheme<Props, Theme>(Element);
