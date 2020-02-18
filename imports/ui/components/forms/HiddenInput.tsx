import { styled } from '../../theme';

export const HiddenInput = styled.input`
  z-index: -9999;
  position: absolute;
  top: 0;
  left: 0;

  clip: rect(0, 0, 0, 0);
`;
