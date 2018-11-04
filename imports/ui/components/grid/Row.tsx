import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';
import { Breakpoints } from '../../theme/media';

export type Ref = HTMLDivElement;

type direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type position = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between' | 'stretch';
type wrap = 'wrap' | 'wrap-reverse' | 'nowrap';
type type = 'column' | 'row';

export type Props = {
  readonly align?: {[key in Breakpoints]?: position} | position,
  readonly alignSelf?: {[key in Breakpoints]?: position} | position,
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly direction?: {[key in Breakpoints]?: direction} | direction,
  readonly innerRef?: React.Ref<Ref>,
  readonly justify?: {[key in Breakpoints]?: position} | position,
  readonly justifySelf?: {[key in Breakpoints]?: position} | position,
  readonly order?: {[key in Breakpoints]?: number } | number,
  readonly size?: {[key in Breakpoints]?: number} | number,
  readonly theme?: Theme,
  readonly wrap?: {[key in Breakpoints]?: wrap } | wrap,
};

const atBreakpoint = (breakpoint: Breakpoints, props: Partial<Props>) => css`
  ${props.size && props.size[breakpoint] && `
    flex: 0 0 ${100 / props.theme.grid.columns * props.size[breakpoint]}%;
  `}

  ${props.direction[breakpoint] && `
    flex-direction: ${props.direction[breakpoint]};
  `}

  ${props.align[breakpoint] && `
    align-items: ${props.align[breakpoint]};
  `}

  ${props.alignSelf && props.alignSelf[breakpoint] && `
    align-items: ${props.alignSelf[breakpoint]};
  `}

  ${props.justify[breakpoint] && `
    justify-content: ${props.justify[breakpoint]};
  `}

  ${props.justifySelf && props.justifySelf[breakpoint] && `
    justify-content: ${props.justifySelf[breakpoint]};
  `}

  ${props.order && props.order[breakpoint] && `
    order: ${props.order[breakpoint]};
  `}

  ${props.wrap && props.wrap[breakpoint] && `
    flex-wrap: ${props.wrap[breakpoint]};
  `}
`;

const style = (props: Partial<Props>) => css`
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;

  ${props.direction && `
    ${(typeof props.direction === 'string') ? `
      flex-direction: ${props.direction};
    ` : `
      flex-direction: ${props.direction.xs || 'initial'};
    `}
  `}

  ${props.align && `
    ${(typeof props.align === 'string') ? `
      align-items: ${props.align};
    ` : `
      align-items: ${props.align.xs || 'initial'};
    `}
  `}

  ${props.alignSelf && `
    ${(typeof props.alignSelf === 'string') ? `
      align-self: ${props.alignSelf};
    ` : `
      align-self: ${props.alignSelf.xs || 'initial'};
    `}
  `}

  ${props.justify && `
    ${(typeof props.justify === 'string') ? `
      justify-content: ${props.justify};
    ` : `
      justify-content: ${props.justify.xs || 'initial'};
    `}
  `}

  ${props.justifySelf && `
    ${(typeof props.justifySelf === 'string') ? `
      justify-self: ${props.justifySelf};
    ` : `
      justify-self: ${props.justifySelf.xs || 'initial'};
    `}
  `}

  ${props.order && `
    ${(typeof props.order === 'number') ? `
      order: ${props.order};
    ` : `
      order: ${props.order.xs || 0};
    `}
  `}

  ${props.wrap && `
    ${(typeof props.wrap === 'string') ? `
      flex-wrap: ${props.wrap};
    ` : `
      flex-wrap: ${props.wrap.xs || 'initial'};
    `}
  `}

  ${mq.sm(css`
    ${atBreakpoint('sm', props)}
  `)}

  ${mq.md(css`
    ${atBreakpoint('md', props)}
  `)}

  ${mq.lg(css`
    ${atBreakpoint('lg', props)}
  `)}

  ${mq.xl(css`
    ${atBreakpoint('xl', props)}
  `)}

  ${props.className}
`;

const Element = React.forwardRef<Ref, Props>((props, ref) => {
  const { children, innerRef } = props;
  return (
    <div ref={innerRef || ref} className={style(props)}>{children}</div>
  );
});

export const Row = withTheme<Props, Theme>(Element);
Row.defaultProps = {
  align: 'center',
  direction: 'row',
  justify: 'center',
  order: 0,
  wrap: 'wrap'
};
