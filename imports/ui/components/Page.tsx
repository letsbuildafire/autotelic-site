import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';

export type Ref = HTMLElement;

type Props = {
  readonly innerRef?: React.Ref<Ref>,
  readonly className?: string,
  children?: React.ReactNode,
} & React.HTMLAttributes<HTMLElement>;

const style = (props: Partial<Props>) => css`
  label: page;

  width: 100%;
  height: auto;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;
  ${props.className}
`;

export const Page = React.forwardRef<Ref, Props>((props, ref) => {
  const { innerRef, className, children, ...rest } = props;

  return (
    <article ref={innerRef || ref} className={style(props)} {...rest}>
      {children}
    </article>
  );
});
Page.displayName = 'Page';
