import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { aboutData } from '../../../data/icons';

export const AboutIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={aboutData} {...props} />
));
