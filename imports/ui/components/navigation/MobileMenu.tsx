import * as React from 'react';
import { styled } from '../../theme';
import { motion } from 'framer-motion';

// components
import { Grid } from '../grid';
import { MotionNav } from './MotionNav';
import { MenuLink } from './MenuLink';
import { MenuToggle } from './MenuToggle';
import { MobileMenuItem } from './MobileMenuItem';

import {
  AboutMenuIcon,
  ContactMenuIcon,
  ServicesMenuIcon
} from '../icons';

const Menu = styled(Grid)`
  position: fixed;
  right: 0;
  top: 0;
  margin: 0;

  height: 100vh;
  width: 100vw;
  padding: ${({ theme }) => theme.grid.margin}px;
  padding-top: ${({ theme }) => theme.grid.margin * 10}px;

  background: ${({ theme }) => theme.colors.menu.background};

  list-style: none;
`;

export const MobileMenu: React.FC = () => {
  const [ open, toggleMenu ] = React.useState(false);

  const variants = {
    visible: {},
    hidden: {},
  };

  const navVariants = {
    visible: {
      opacity: 1,
      transition: {
        stiffness: 20,
        staggerChildren: 0.1,
        when: 'beforeChildren',
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        stiffness: 400,
        damping: 100,
      }
    },
  };

  return (
    <MotionNav initial="hidden" variants={variants} animate={open ? 'visible' : 'hidden'} layoutTransition>
      <MenuToggle on={open} toggle={() => toggleMenu(!open)}/>
      <Menu as={motion.ul} gaps="0" flow="column" variants={navVariants}>
        <MobileMenuItem role="none">
          <MenuLink to="/about" onClick={() => toggleMenu(false)}>
            <AboutMenuIcon/>
            About
          </MenuLink>
        </MobileMenuItem>
        <MobileMenuItem role="none">
          <MenuLink to="/services" onClick={() => toggleMenu(false)}>
            <ServicesMenuIcon/>
            Services
          </MenuLink>
        </MobileMenuItem>
        <MobileMenuItem role="none">
          <MenuLink to="/contact" onClick={() => toggleMenu(false)}>
            <ContactMenuIcon/>
            Contact
          </MenuLink>
        </MobileMenuItem>
      </Menu>
    </MotionNav>
  );
};
