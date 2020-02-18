import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { experienceData } from '../../../data/icons';

export const UserExperienceIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={experienceData} {...props} />
));
