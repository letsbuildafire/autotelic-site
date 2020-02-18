import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { creativeData } from '../../../data/icons';

export const CreativeIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={creativeData} {...props} />
));
