import { mq } from '../media';

export const grid = {
  columns: 12,
  gutter: 10, // px
  margin: 10, // px
  container: {
    sm: 640, // px
    md: 960, // px
    lg: 1368, // px
    xl: 1600 // px
  }
};

export const FLUID_CONTAINER = `
  width: 100%;

  padding-left: ${grid.margin * 2}px;
  padding-right: ${grid.margin * 2}px;

  margin-left: auto;
  margin-right: auto;

  ${mq.sm}{
    padding-left: ${grid.margin}px;
    padding-right: ${grid.margin}px;
  }
`;

export const CONTAINER = `
  ${FLUID_CONTAINER}

  ${mq.sm}{
    width: ${grid.container.sm}px;
  }

  ${mq.md}{
    width: ${grid.container.md}px;
  }

  ${mq.lg}{
    width: ${grid.container.lg}px;
  }

  ${mq.xl}{
    width: ${grid.container.xl}px;
  }
`;
