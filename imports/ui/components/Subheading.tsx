import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../theme';

export type Ref = HTMLHeadingElement;

export type Props = {
  readonly children: string,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
};

const style = (props: Partial<Props>) => css`
  color: ${props.theme.color.subheading};

  font-size: 1.875rem;
  font-weight: normal;
  line-height: 1.875rem;
  text-align: left;

  margin-top: 0;
  margin-bottom: 1.5rem;

  ${mq.md(css`
    font-size: 2.625rem;
    line-height: 2.625rem;
  `)}

  ${props.className}
`;

const Element = React.forwardRef<Ref, Props>((props: Props, ref) => (
  <h2 ref={props.innerRef || ref} className={style(props)}>{props.children}</h2>
));
Element.displayName = 'Subheading';

export const Subheading = withTheme<Props, Theme>(Element);
