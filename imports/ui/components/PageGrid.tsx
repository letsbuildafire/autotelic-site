import { styled } '../theme';
import { FLUID_CONTAINER } from '../theme/grid';

// components
import { Grid } from './grid';
export const PageGrid = styled(Grid)`
  height: 100%;
  max-width: ${({ theme }) => theme.grid.container.xl}px;

  color: ${({ theme }) => theme.colors.foreground};
`;

PageGrid.defaultProps = {
  layout: 'grid',
  columns: {
    xs: 'minmax(0, 1fr) 30px',
    sm: '60px 360px 1fr',
    md: '60px 480px 1fr',
  },
  rows: {
    xs: '80px 1fr 3fr',
    sm: '120px 1fr',
  },
  rowGap: '0',
  align: 'center',
  alignContent: 'space-around',
  justify: 'center',
  justifyContent: 'stretch',
};
