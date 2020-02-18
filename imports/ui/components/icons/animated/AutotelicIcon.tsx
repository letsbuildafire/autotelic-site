import * as React from 'react';
import { styled } from '../../../theme';

import { SectionIcon } from './SectionIcon';
import { homeAutotelicData } from '../../../data/icons';

export const AutotelicIcon = React.forwardRef((props, ref) => (
  <Icon ref={ref} animationData={homeAutotelicData} {...props} />
));

const Icon = styled(SectionIcon)`
  min-height: 500px;
  min-width: 500px;

  opacity: 1;
  mix-blend-mode: initial;
`;
