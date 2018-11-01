import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq } from '../theme/media';
import { Theme, ThemeVariant } from '../theme';

export type Ref = HTMLHeadingElement;

export type Props = {
  readonly children: string,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const style = (props: Partial<Props>) => css`
  color: ${props.theme.color[props.variant].heading};

  font-size: 0.625rem;
  font-weight: bold;
  line-height: 0.625rem;
  text-align: left;
  text-transform: uppercase;

  margin-bottom: 0.625rem;

  ${mq.md(css`
    font-size: 0.875rem;
    line-height: 0.875rem;
  `)}
`;

const Element = React.forwardRef<Ref, Props>((props, ref) => (
  <h1 ref={props.innerRef || ref} className={style(props)}>{props.children}</h1>
));
Element.displayName = 'Heading';
Element.defaultProps = {
  variant: 'dark',
};

export const Heading = withTheme<Props, Theme>(Element);
