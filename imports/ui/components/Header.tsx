import * as React from 'react';
import { styled } from '../theme';

// helpers
import { AtBreakpoint } from '../../Breakpoint';

// components
import { Grid } from './grid';
import { Menu } from './navigation/Menu';
import { MobileMenu } from './navigation/MobileMenu';
import { Branding } from '../components/Branding';

export const Header: React.FC = () => {
  return (
    <Grid
      as={StyledHeader}
      columns="auto 1fr"
      areas="' branding navigation '"
      fluid={false}
      align="center"
      justify="center"
      justifyContent="space-between"
    >
      <AtBreakpoint xs down>
        <MobileMenu/>
      </AtBreakpoint>
      <AtBreakpoint sm up>
        <Menu/>
      </AtBreakpoint>
      <Branding/>
    </Grid>
  );
};

const StyledHeader = styled.header`
  padding: ${({ theme }) => theme.grid.margin * 2}px;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  z-index: 5000;
`
