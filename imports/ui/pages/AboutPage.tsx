import * as React from 'react';
import { History, Location } from 'history';
import { css, keyframes } from 'emotion';
import { themes } from '../theme';
import { debounce, findIndex, map } from 'lodash';
import { matchPath } from 'react-router';

// helpers
import { TweenLite, TimelineLite } from 'gsap';
import * as TransitionGroupPlus from 'react-transition-group-plus';

// components
import { Page, Ref as PageRef } from '../components/Page';
import { SwipeableSection } from '../containers/SwipeableSection';
import { SectionIcon } from '../components/icons';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { NavButton } from '../components/buttons';
import { Dots } from '../components/pagination';

// icon data
import {
  aboutData,
  partnershipData,
} from '../../ui/data/icons';

type Props = {
  readonly history?: History,
  readonly location?: Location,
  sections?: Array<{path: string, title?: string}>,
};

const scroll = keyframes`
  from, to {
    background-position-y: 0;
  }

  50% {
    background-position-y: 100%;
  }
`;

const style = (props: Partial<Props>) => css`
  justify-content: flex-start;

  background: radial-gradient(circle at 100% 0, crimson, dodgerblue);
  background-size: 300% 300%;
  background-position-x: 0%;
  background-position-y: 50%;
  will-change: background-position;

  animation: ${scroll} 60s ease infinite;
`;

const sectionStyle = (props: Partial<Props>) => css`
  min-height: 100vh;
`;

const dotsStyle = (props: Partial<Props>, state: State) => css`
  position: absolute;
  right: 0;
  bottom: 20px;
  left: 0;
  margin: auto;

  flex: 0 0 auto;

  opacity: 0.3;
`;

type State = {
  active?: number,
  previous?: number,
};

export class AboutPage extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    sections: [
      {path: '/about/', title: 'About Us'},
      {path: '/about/who-we-are/', title: 'Who We Are'},
      {path: '/about/partnerships/', title: 'Partnerships'},
    ],
  };
  private ref = React.createRef<PageRef>();

  constructor(props: Props) {
    super(props);

    this.getSectionIndex = this.getSectionIndex.bind(this);
    this.changeSection = this.changeSection.bind(this);

    const { sections, location } = props;
    this.state = {
      active: this.getSectionIndex(location!.pathname),
      previous: -1,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { location, sections } = this.props;
    const { location: from } = prevProps;
    const { active: previous } = prevState;

    const active = this.getSectionIndex(location.pathname);

    if (this.ref.current) {
      TweenLite.to(this.ref.current, 1, {
        backgroundPositionX: `${(active + 1) / sections.length * 100}%`,
      });
    }

    if (location.pathname !== from.pathname) {
      this.setState({
        active,
        previous,
      });
    }
  }

  componentWillAppear(cb: () => void) {
    TweenLite.fromTo(this.ref.current.children, 0.3, {
      y: -20,
    }, {
      y: 0,
      clearProps: 'translate',
      onComplete: cb,
    });
  }

  componentWillEnter(cb: () => void) {
    TweenLite.fromTo(this.ref.current.children, 0.3, {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      clearProps: 'translate, opacity',
      onComplete: cb,
    });
  }

  componentWillLeave(cb: () => void) {
    TweenLite.set(this.ref.current, {
      position: 'absolute',
      zIndex: 2,
    });

    TweenLite.to(this.ref.current.children, 0.3, {
      opacity: 0,
      y: 20,
      onComplete: cb,
    });
  }

  changeSection(path: string) {
    const { history } = this.props;

    // debounce to prevent pushing multiple history states
    const push = debounce(() => history.push(path), 100);

    return (e, dx) => {
      if (dx >= 10) {
        push();
      }
    };
  }

  getSectionIndex(section: string) {
    const { sections } = this.props;

    return findIndex(sections, ({ path }) =>
      matchPath(section, {path, strict: false, exact: true}) && true
    );
  }

  render() {
    const { location, sections } = this.props;
    const { active, previous } = this.state;

    const next = this.getSectionIndex(location.pathname);

    return (
      <TransitionGroupPlus
        innerRef={this.ref}
        className={style(this.props)}
        transitionMode="out-in"
        component={Page}
        childFactory={ child => React.cloneElement(child, {
          transitionDirection: {
            in: child.props.index >= previous,
            out: (next !== child.props.index) && next > child.props.index,
          }
        })}
      >
        {matchPath(location.pathname, {path: '/about/', strict: false, exact: true}) && (
          <SwipeableSection
            index={0}
            className={sectionStyle(this.props)}
            onSwipingLeft={this.changeSection('/about/who-we-are')}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.light}
          >
            {{
              heading: <Heading theme={themes.light}>About Us</Heading>,
              subheading: <Subheading theme={themes.light}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>,
              content: (
                <p>
                  We’re an independent digital experience agency.
                  A secret weapon for brands. A sage counsel to partners.
                </p>
              ),
              action: <NavButton color="crimson" to="/about/who-we-are" exact>Who we are</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: '/about/who-we-are/', strict: false, exact: true}) && (
          <SwipeableSection
            index={1}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection('/about')}
            onSwipingLeft={this.changeSection('/about/partnerships')}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.light}
          >
            {{
              icon: <SectionIcon theme={themes.dark} animationData={aboutData}/>,
              heading: <Heading theme={themes.light}>Who We Are</Heading>,
              subheading: <Subheading theme={themes.light}>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  A team of strategists disguised as designers, developers
                  and good old fashioned storytellers. We combine creative
                  thinking with a really sharp backbone of great process,
                  intelligent execution and a relentless attention to detail.
                </p>
              ),
              action: <NavButton color="crimson" to="/about/partnerships" exact>Partnerships</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: '/about/partnerships/', strict: false, exact: true}) && (
          <SwipeableSection
            index={2}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection('/about/who-we-are')}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.light}
          >
            {{
              icon: <SectionIcon theme={themes.dark} animationData={partnershipData}/>,
              heading: <Heading theme={themes.light}>Partnerships / Relationships</Heading>,
              subheading: <Subheading theme={themes.light}>Our partnerships produce results.</Subheading>,
              content: (
                <p>
                  Our business is built on relationships. Whether they’re a
                  short term engagement to accomplish discrete, high-profile
                  tasks or the kind that cross many paths and endure for years.
                </p>
              ),
              action: <NavButton color="crimson" to="/services" exact>Services</NavButton>
            }}
          </SwipeableSection>
        )}
        <Dots
          className={dotsStyle(this.props, this.state)}
          current={active}
          diameter={20}
          items={map(sections, 'path')}
          theme={themes.dark}
        />
      </TransitionGroupPlus>
    );
  }
}

const sectionMount = (els) => {
  TweenLite.set(els.self.current, {
    opacity: 0,
  });
};

const sectionAppear = (els, cb) => {
  TweenLite.set(els.self.current, {
    opacity: 1,
  });
  cb();
};

const sectionEnter = (els, direction, cb) => {
  const tl = new TimelineLite();

  tl.set(els.self.current, {
    opacity: 1,
  });

  if (els.heading.current) {
    tl.fromTo(els.heading.current, 0.3, {
      opacity: 0,
      x: `${direction ? '' : '-'}120px`,
    }, {
      opacity: 1,
      x: '0px',
    });
  }

  tl.fromTo(els.subheading.current, 0.3, {
    opacity: 0,
    x: `${direction ? '' : '-'}120px`,
  }, {
    opacity: 1,
    x: '0px',
  }, '-=0.15').fromTo(els.content.current, 0.3, {
    opacity: 0,
    x: `${direction ? '' : '-'}120px`,
  }, {
    opacity: 1,
    x: '0px',
  }, '-=0.15');

  tl.call(cb);
  tl.play();
};

const sectionLeave = (els, direction, cb) => {
  const tl = new TimelineLite();

  TweenLite.set(els.self.current, {
    position: 'absolute',
  });

  if (els.icon.current) {
    tl.fromTo(els.icon.current, 0.2, {
      opacity: 1,
    }, {
      opacity: 0,
    });
  }

  if (els.heading.current) {
    tl.fromTo(els.heading.current, 0.3, {
      opacity: 1,
      x: '0px',
    }, {
      opacity: 0,
      x: `${direction ? '-' : ''}120px`,
    });
  }

  tl.fromTo(els.subheading.current, 0.3, {
    opacity: 1,
    x: '0px',
  }, {
    opacity: 0,
    x: `${direction ? '-' : ''}120px`,
  }, '-=0.15').fromTo(els.content.current, 0.3, {
    opacity: 1,
    x: '0px',
  }, {
    opacity: 0,
    x: `${direction ? '-' : ''}120px`,
  }, '-=0.15');

  tl.call(cb);
  tl.play();
};
