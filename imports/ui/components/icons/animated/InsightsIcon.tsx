import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { insightsData } from '../../../data/icons';

export const InsightsIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={insightsData} {...props} />
));
