import { styled } from '../../../theme';

export const SocialIcon = styled.svg`
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;

SocialIcon.defaultProps = {
  height: 20,
  width: 20,
  viewBox: '0 0 20 20',
};
