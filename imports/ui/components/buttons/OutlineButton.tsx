import { styled } from '../../theme';
import { shade } from 'polished';

import { getColor } from './util';
import { Button } from './Button';

export const OutlineButton = styled(Button)`
  background: none;

  box-sizing: border-box;
  border-width: 3px;
  border-style: solid;

  color: ${getColor};

  &:hover {
    background: none;

    color: ${props => shade('0.05', getColor(props))};
  }
`;
