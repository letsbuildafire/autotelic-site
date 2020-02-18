import { styled, mq } from '../../../theme';

// components
import { Animation } from '../../../effects/Animation';

export const SectionIcon = styled(Animation)`
    height: 130vmin;
    width: 130vmin;
    min-height: 400px;
    min-width: 400px;

    transform: translate3d(-10%, -5%, 0);
    z-index: 0;

    color: ${({ theme }) => theme.colors.section_icon};
    filter: blur(2px);

    ${({ theme }) => theme.is_dark
      ? `
        opacity: 0.1;
      `
      : `
        opacity: 0.1;
      `
    }
`;

SectionIcon.defaultProps = {
  autoplay: true,
  speed: 1,
};
