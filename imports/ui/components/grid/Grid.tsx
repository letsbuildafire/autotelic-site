import * as React from 'react';
import { styled, mq, Breakpoint, BreakpointProps } from '../../theme';
import { FLUID_CONTAINER, CONTAINER } from '../../theme/grid';

import { getProperty } from './util';

type Display = 'grid' | 'inline-grid' | 'subgrid';
type Position = 'normal' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type PositionContent = Position | 'auto' | 'space-between' | 'space-around';

type Props = {
  readonly align?: BreakpointProps<Position> | Position,
  readonly alignContent?: BreakpointProps<PositionContent> | PositionContent,
  readonly areas?: BreakpointProps<string> | string,
  readonly as?: string | React.ReactElement,
  readonly columns?: BreakpointProps<string> | string,
  readonly columnGap?: BreakpointProps<string> | string,
  readonly flow?: BreakpointProps<string>  | string,
  readonly fluid?: boolean,
  readonly gaps?: BreakpointProps<string> | string,
  readonly justify?: BreakpointProps<Position> | Position,
  readonly justifyContent?: BreakpointProps<PositionContent> | PositionContent,
  readonly layout?: BreakpointProps<Display> | Display,
  readonly rows?: BreakpointProps<string> | string,
  readonly rowGap?: BreakpointProps<string> | string,
};

const style = (breakpoint: Breakpoint | null, props: Props) => `
  ${props.layout ? getProperty('display', props.layout, breakpoint) : ''}

  ${props.columns ? getProperty('grid-template-columns', props.columns, breakpoint) : ''}
  ${props.rows ? getProperty('grid-template-rows', props.rows, breakpoint) : ''}
  ${props.areas ? getProperty('grid-template-areas', props.areas, breakpoint) : ''}
  ${props.flow ? getProperty('grid-auto-flow', props.flow, breakpoint) : ''}
  ${props.gaps ? getProperty('gap', props.gaps, breakpoint) : ''}
  ${props.columnGap ? getProperty('column-gap', props.columnGap, breakpoint) : ''}
  ${props.rowGap ? getProperty('row-gap', props.rowGap, breakpoint) : ''}

  ${props.align ? getProperty('align-items', props.align, breakpoint) : ''}
  ${props.alignContent ? getProperty('align-content', props.alignContent, breakpoint) : ''}
  ${props.justify ? getProperty('justify-items', props.justify, breakpoint) : ''}
  ${props.justifyContent ? getProperty('justify-content', props.justifyContent, breakpoint) : ''}
`;

export const Grid = styled.div<Props>`
  ${({ fluid }) => fluid ? FLUID_CONTAINER : CONTAINER}

  /* base styles */
  gap: ${({ theme }) => theme.grid.gutter}px;

  /* use null breakpoint for base and string-value properties */
  ${props => style(null, props)}

  ${props => style('xs', props)}

  ${mq.sm}{
    ${props => style('sm', props)}
  }

  ${mq.md}{
    ${props => style('md', props)}
  }

  ${mq.lg}{
    ${props => style('lg', props)}
  }

  ${mq.xl}{
    ${props => style('xl', props)}
  }
`;

Grid.defaultProps = {
  fluid: true,
  layout: 'grid',
};
