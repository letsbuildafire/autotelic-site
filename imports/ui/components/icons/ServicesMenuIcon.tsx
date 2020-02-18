import * as React from 'react';
import { styled, mq } from '../../theme';
import { MenuIcon } from './animated/MenuIcon';
import { menuServicesData } from '../../data/icons';

export const ServicesMenuIcon = React.forwardRef((props, ref) => (
  <MenuIcon ref={ref} animationData={menuServicesData} />
));
