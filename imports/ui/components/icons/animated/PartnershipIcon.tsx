import * as React from 'react';
import { SectionIcon } from './SectionIcon';
import { partnershipData } from '../../../data/icons';

export const PartnershipIcon = React.forwardRef((props, ref) => (
  <SectionIcon ref={ref} animationData={partnershipData} {...props} />
));
