import * as React from 'react';
import { MenuIcon } from './animated/MenuIcon';
import { menuAboutData } from '../../data/icons';

export const AboutMenuIcon = React.forwardRef((props, ref) => (
  <MenuIcon ref={ref} animationData={menuAboutData} />
));
