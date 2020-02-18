import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { servicesData } from '../../../data/icons';

export const ServicesIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={servicesData} {...props} />
));
