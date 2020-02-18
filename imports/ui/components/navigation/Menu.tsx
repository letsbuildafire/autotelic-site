import * as React from 'react';
import { styled } from '../../theme';

// components
import { Item } from '../grid';
import { MenuLink } from './MenuLink';

import {
  AboutMenuIcon,
  ContactMenuIcon,
  ServicesMenuIcon
} from '../icons';

const Nav = styled.nav`
  overflow: hidden;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const Menu: React.FC = ({ children }) => {
  return (
    <Item as={Nav} area="navigation" justifySelf="end">
      <MenuLink to="/about">
        <AboutMenuIcon/>
        About
      </MenuLink>
      <MenuLink to="/services">
        <ServicesMenuIcon/>
        Services
      </MenuLink>
      <MenuLink to="/contact">
        <ContactMenuIcon/>
        Contact
      </MenuLink>
    </Item>
  );
};
