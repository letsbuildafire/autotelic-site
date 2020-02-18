import * as React from 'react';
import { styled, mq } from '../../theme';
import { MenuIcon } from './animated/MenuIcon';
import { menuContactData } from '../../data/icons';

export const ContactMenuIcon = React.forwardRef((props, ref) => (
  <MenuIcon ref={ref} animationData={menuContactData} />
));
