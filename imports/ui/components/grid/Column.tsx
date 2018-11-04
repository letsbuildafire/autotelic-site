import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { mq, Theme } from '../../theme';
import { Breakpoints } from '../../theme/media';

export type Ref = HTMLDivElement;

type position = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between' | 'stretch';

export type Props = {
  readonly align?: {[key in Breakpoints]?: position} | position,
  readonly children?: React.ReactNode,
  readonly className?: string,
  readonly innerRef?: React.Ref<Ref>,
  readonly justify?: {[key in Breakpoints]?: position} | position,
  readonly offset?: {[key in Breakpoints]?: number} | number,
  readonly order?: {[key in Breakpoints]?: number} | number,
  readonly size?: {[key in Breakpoints]?: number} | number,
  readonly theme?: Theme,
};

const atBreakpoint = (breakpoint: Breakpoints, props: Partial<Props>) => css`
  ${props.size && props.size[breakpoint] && `
    flex: 0 0 ${100 / props.theme.grid.columns * props.size[breakpoint]}%;
  `}

  ${props.justify && props.justify[breakpoint] && `
    justify-content: ${props.justify[breakpoint]};
  `}

  ${props.align && props.align[breakpoint] && `
    align-items: ${props.align[breakpoint]};
  `}

  ${props.offset && props.offset[breakpoint] && `
    margin-left: ${100 / props.theme.grid.columns * props.offset[breakpoint]}%;
  `}

  ${props.order && props.order[breakpoint] && `
    order: ${props.order[breakpoint]};
  `}
`;

const style = (props: Partial<Props>) => css`
  label: column;

  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  position: relative;
  width: 100%;
  min-height: 1px;

  padding-right: ${props.theme.grid.gutterWidth / 2}px;
  padding-left: ${props.theme.grid.gutterWidth / 2}px;

  ${props.size && `
    ${(typeof props.size === 'number') && `
      flex: 0 0 ${100 / props.theme.grid.columns * props.size}%;
      width: ${100 / props.theme.grid.columns * props.size}%;
    `}
    ${(typeof props.size === 'object') && props.size.xs && `
      flex: 0 0 ${100 / props.theme.grid.columns * (props.size.xs || props.theme.grid.columns)}%;
      width: ${100 / props.theme.grid.columns * (props.size.xs || props.theme.grid.columns)}%;
    `}
  `}

  ${props.justify && `
    ${(typeof props.justify === 'string') ? `
      justify-content: ${props.justify};
    ` : `
      justify-content: ${props.justify.xs || 'initial'};
    `}
  `}

  ${props.align && `
    ${(typeof props.align === 'string') ? `
      align-items: ${props.align};
    ` : `
      align-items: ${props.align.xs || 'initial'};
    `}
  `}

  ${props.order && `
    ${(typeof props.order === 'number') ? `
      order: ${props.order};
    ` : `
      order: ${props.order.xs || 0};
    `}
  `}

  ${props.offset && `
    ${(typeof props.offset === 'number') && `
      margin-left: ${100 / props.theme.grid.columns * props.offset}%;
    `}
    ${(typeof props.offset === 'object') && props.offset.xs && `
      margin-left: ${100 / props.theme.grid.columns * props.offset.xs}%;
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

export const Column = withTheme<Props, Theme>(Element);
