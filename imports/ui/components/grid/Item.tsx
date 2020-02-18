import * as React from 'react';
import { styled, mq, Breakpoint, BreakpointProps } from '../../theme';

import { getProperty } from './util';

type Position = 'normal' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';

type Props = {
  readonly as?: string | React.ReactElement,
  readonly alignSelf?: BreakpointProps<Position> | Position,
  readonly area?: BreakpointProps<string> | string,
  readonly gridColumn?: BreakpointProps<string> | string,
  readonly gridRow?: BreakpointProps<string> | string,
  readonly justifySelf?: BreakpointProps<Position> | Position,
  readonly order?: BreakpointProps<number> | number,
  readonly stackOrder?: BreakpointProps<number> | number,
};

const style = (breakpoint: Breakpoint | null, props: Props) => `
  ${props.gridColumn ? getProperty('grid-column', props.gridColumn, breakpoint) : ''}
  ${props.gridRow ? getProperty('grid-row', props.gridRow, breakpoint) : ''}
  ${props.area ? getProperty('grid-area', props.area, breakpoint) : ''}

  ${props.order ? getProperty('order', props.order, breakpoint) : ''}
  ${props.stackOrder ? getProperty('z-index', props.stackOrder, breakpoint) : ''}

  ${props.alignSelf ? getProperty('align-self', props.alignSelf, breakpoint) : ''}
  ${props.justifySelf ? getProperty('justify-self', props.justifySelf, breakpoint) : ''}
`;

export const Item = styled.div<Props>`
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
