import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// helpers
import { mq, Breakpoints } from '../../theme/media';

export type Ref = HTMLDivElement;

type position = 'start' | 'center' | 'end' | 'stretch';

export type Props = {
  readonly align?: {[key in Breakpoints]?: position} | position,
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly area?: {[key in Breakpoints]?: string} | string,
  readonly column?: {[key in Breakpoints]?: string} | string,
  readonly element?: string | React.ComponentType,
  readonly innerRef?: React.Ref<Ref>,
  readonly justify?: {[key in Breakpoints]?: position} | position,
  readonly order?: {[key in Breakpoints]?: number} | number,
  readonly row?: {[key in Breakpoints]?: string} | string,
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const atBreakpoint = (breakpoint: Breakpoints, props: Partial<Props>) => css`
  ${props.column && props.column[breakpoint] && `
    grid-column: ${props.column[breakpoint]};
  `}

  ${props.row && props.row[breakpoint] && `
    grid-row: ${props.row[breakpoint]};
  `}

  ${props.area && props.area[breakpoint] && `
    grid-area: ${props.area[breakpoint]};
  `}

  ${props.align && props.align[breakpoint] && `
    align-self: ${props.align[breakpoint]};
  `}

  ${props.justify && props.justify[breakpoint] && `
    justify-self: ${props.justify[breakpoint]};
  `}

  ${props.order && props.order[breakpoint] && `
    order: ${props.order[breakpoint]};
  `}
`;

const baseValue = (breakpoint: Breakpoints, prop: any, value: any = false): any => {
  if (typeof prop === 'string') {
    return prop;
  }

  return (breakpoint in prop) ? prop[breakpoint] : value;
};

const style = (props: Partial<Props>) => css`
  ${props.column && baseValue('xs', props.column) && `
    grid-column: ${baseValue('xs', props.column)};
  `}

  ${props.row && baseValue('xs', props.row) && `
    grid-row: ${baseValue('xs', props.row)};
  `}

  ${props.area && baseValue('xs', props.area) && `
    grid-area: ${baseValue('xs', props.area)};
  `}

  ${props.align && baseValue('xs', props.align) && `
    align-self: ${baseValue('xs', props.align)};
  `}

  ${props.justify && baseValue('xs', props.justify) && `
    justify-self: ${baseValue('xs', props.justify)};
  `}

  ${props.order && baseValue('xs', props.order) && `
    order: ${baseValue('xs', props.order)};
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
  const { innerRef, element, className, children } = props;
  const passed = {
    ref: innerRef || ref,
    className: style(props),
  };

  return React.createElement(element, passed as any, children);
});

export const Item = withTheme<Props, Theme>(Element);
Item.defaultProps = {
  element: 'div',
};
