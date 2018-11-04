import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';
import { shade, readableColor } from 'polished';

export type Ref = HTMLButtonElement;

export type Props = {
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly color?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly theme?: Theme,
} & React.HTMLProps<HTMLButtonElement>;

export const style = (props: Partial<Props>) => css`
  background-color: ${props.color};
  border-radius: 1.75rem;
  border: none;

  display: inline-block;
  min-width: 10rem;
  margin: 0 auto;
  padding: 1rem 2rem;

  color: ${readableColor(props.color)};
  font-size: 0.625rem;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;

  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${shade('0.05', props.color)};
    color: ${readableColor(props.color)};
  }

  &:disabled {
    opacity: 0.3;
  }

  ${mq.md(css`
    padding: 1.25rem 2.5rem;

    font-size: 0.75rem;
  `)}

  ${props.className}
`;

class Element extends React.PureComponent<Props> {
  public static displayName = 'Button';
  public static defaultProps = {
    color: 'teal',
    type: 'button',
  };

  render() {
    const {
      children,
      className,
      innerRef,
      theme,
      type,
      ...rest
    } = this.props;

    return (
      <button ref={innerRef} type={type} className={style(this.props)} {...rest}>{children}</button>
    );
  }
}

export const Button = withTheme<Props, Theme>(Element);
