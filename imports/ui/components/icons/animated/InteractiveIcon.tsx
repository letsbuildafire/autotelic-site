import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { interactiveData } from '../../../data/icons';

export const InteractiveIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={interactiveData} {...props} />
));
