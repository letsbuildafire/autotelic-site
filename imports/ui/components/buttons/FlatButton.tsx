import { styled, mq } from '../../theme';
import { lighten } from 'polished';

import { getColor } from './util';

type Props = { readonly color?: string };
export const FlatButton = styled.button<Props>`
  background: none;
  border: none;
  color: ${props => getColor(props, 'flat')};

  padding: 1.25rem 0.5rem;

  font-size: 0.625rem;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;

  transition: color 200ms ease-out;

  &:hover {
    color: ${props => lighten(0.25, getColor(props, 'flat'))};
  }

  &:disabled {
    opacity: 0.3;
  }

  ${mq.md}{
    font-size: 0.8125rem;
  }
`;

FlatButton.defaultProps = {
  type: 'button',
};
