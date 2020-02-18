import { styled, mq } from '../../../theme';

// components
import { Animation } from '../../../effects/Animation';

export const MenuIcon = styled(Animation)`
    height: 54px;
    width: 54px;

    ${mq.sm} {
      height: 28px;
      width: 28px;
    }

    & path {
      stroke: currentColor;
      stroke-width: 8;
    }
`;

MenuIcon.defaultProps = {
  autoplay: true,
  speed: 1,
};
