import { css } from 'emotion';
import { mq } from './media';

export const grid = {
  columns: 12,
  gutterWidth: 20,
  outerMargin: 32,
  container: {
    sm: 540,
    md: 860,
    lg: 1200,
    xl: 1440
  }
};

export const FLUID_CONTAINER = css`
  width: 100%;
  padding-left: ${Math.floor(grid.outerMargin / 2)}px;
  padding-right: ${Math.floor(grid.outerMargin / 2)}px;

  margin-left: auto;
  margin-right: auto;

  ${mq.sm(css`
    padding-left: ${grid.outerMargin}px;
    padding-right: ${grid.outerMargin}px;
  `)}
`;

export const CONTAINER = css`
  ${FLUID_CONTAINER}

  ${mq.sm(css`
    width: ${grid.container.sm}px;
  `)}

  ${mq.md(css`
    width: ${grid.container.md}px;
  `)}

  ${mq.lg(css`
    width: ${grid.container.lg}px;
  `)}

  ${mq.xl(css`
    width: ${grid.container.xl}px;
  `)}
`;
