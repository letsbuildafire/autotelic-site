import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { Theme, ThemeVariant } from '../../theme';

// helpers
import { mq, Breakpoints } from '../../theme/media';

export type Ref = HTMLElement;

export type Props = {
  readonly align?: {[key in Breakpoints]?: string} | string,
  readonly alignContent?: {[key in Breakpoints]?: string} | string,
  readonly areas?: {[key in Breakpoints]?: string } | string,
  readonly children: React.ReactNode,
  readonly className?: string,
  readonly columns?: {[key in Breakpoints]?: string } | string,
  readonly display?: {[key in Breakpoints]?: string} | string,
  readonly element?: string,
  readonly flow?: {[key in Breakpoints]?: string}  | string,
  readonly gaps?: {[key in Breakpoints]?: string } | string,
  readonly innerRef?: React.Ref<Ref>,
  readonly justify?: {[key in Breakpoints]?: string} | string,
  readonly justifyContent?: {[key in Breakpoints]?: string} | string,
  readonly rows?: {[key in Breakpoints]?: string } | string,
  readonly theme?: Theme,
};

const atBreakpoint = (breakpoint: Breakpoints, props: Partial<Props>) => css`
  ${props.display && props.display[breakpoint] && `
    display: ${props.display[breakpoint]};
  `}

  ${props.columns && props.columns[breakpoint] && `
    grid-template-columns: ${props.columns[breakpoint]};
  `}

  ${props.rows && props.rows[breakpoint] && `
    grid-template-rows: ${props.rows[breakpoint]};
  `}

  ${props.areas && props.areas[breakpoint] && `
    grid-template-areas: ${props.areas[breakpoint]};
  `}

  ${props.gaps && props.gaps[breakpoint] && `
    grid-gap: ${props.gaps[breakpoint]};
  `}

  ${props.align && props.align[breakpoint] && `
    align-items: ${props.align[breakpoint]};
  `}

  ${props.justify && props.justify[breakpoint] && `
    justify-items: ${props.justify[breakpoint]};
  `}

  ${props.alignContent && props.alignContent[breakpoint] && `
    align-content: ${props.alignContent[breakpoint]};
  `}

  ${props.justifyContent && props.justifyContent[breakpoint] && `
    justify-content: ${props.justifyContent[breakpoint]};
  `}
`;

const baseValue = (breakpoint: Breakpoints, prop: any, value: any = false): any => {
  if (typeof prop === 'string') {
    return prop;
  }

  return (breakpoint in prop) ? prop[breakpoint] : value;
};

const style = (props: Partial<Props>) => css`
  display: ${baseValue('xs', props.display, 'grid')};

  ${props.columns && baseValue('xs', props.columns) && `
    grid-template-columns: ${baseValue('xs', props.columns)};
  `}

  ${props.rows && baseValue('xs', props.rows) && `
    grid-template-rows: ${baseValue('xs', props.rows)};
  `}

  ${props.gaps && baseValue('xs', props.gaps) && `
    grid-gap: ${baseValue('xs', props.gaps)};
  `}

  ${props.areas && baseValue('xs', props.areas) && `
    grid-template-areas: ${baseValue('xs', props.areas)};
  `}

  ${props.align && baseValue('xs', props.align) && `
    align-items: ${baseValue('xs', props.align)};
  `}

  ${props.justify && baseValue('xs', props.justify) && `
    justify-items: ${baseValue('xs', props.justify)};
  `}

  ${props.alignContent && baseValue('xs', props.alignContent) && `
    align-content: ${baseValue('xs', props.alignContent)};
  `}

  ${props.justifyContent && baseValue('xs', props.justifyContent) && `
    justify-content: ${baseValue('xs', props.justifyContent)};
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
  const {
    align,
    alignContent,
    areas,
    children,
    className,
    columns,
    display,
    element,
    flow,
    gaps,
    innerRef,
    justify,
    justifyContent,
    rows,
    theme,
    ...pass
  } = props;

  const properties = {
    ...pass,
    ref: innerRef || ref,
    className: style(props),
  };

  return React.createElement(element, properties, children);
});

export const Grid = withTheme<Props, Theme>(Element);
Grid.defaultProps = {
  display: 'grid',
  element: 'div',
};
