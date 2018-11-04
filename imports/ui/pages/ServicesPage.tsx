import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';
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
  creativeData,
  experienceData,
  insightsData,
  interactiveData,
  servicesData,
} from '../../ui/data/icons';

type Props = {
  readonly history?: History,
  readonly location?: Location,
  sections?: Array<{path: string, title?: string}>,
};

const style = (props: Partial<Props>) => css`
  justify-content: flex-start;

  background: linear-gradient(32deg, greenyellow, lightseagreen, red);
  background-size: 500% 500%;
  background-position-x: 0%;
  background-position-y: 50%;
`;

const sectionStyle = (props: Partial<Props>) => css`
  min-height: 100%;

  flex: 1 0 100%;
`;

const dotsStyle = (props: Partial<Props>, state: State) => css`
  position: absolute;
  margin: auto;
  right: 0;
  bottom: 20px;
  left: 0;

  flex: 0 0 auto;
`;

type State = {
  active?: number,
  previous?: number,
};

export class ServicesPage extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    sections: [
      {path: '/services/', title: 'Services'},
      {path: '/services/user-experience/', title: 'User Experience'},
      {path: '/services/creative/', title: 'Creative'},
      {path: '/services/interactive/', title: 'Interactive'},
      {path: '/services/data-insights/', title: 'Data / Insights'},
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
    const { sections, location } = this.props;
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
      y: 20,
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
        {matchPath(location.pathname, {path: sections[0].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={0}
            className={sectionStyle(this.props)}
            onSwipingLeft={this.changeSection(sections[1].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.dark}
          >
            {{
              heading: <Heading theme={themes.dark}>Services</Heading>,
              subheading: <Subheading theme={themes.dark}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>,
              content: (
                  <p>
                    Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                    sit amet consectetur. Lorem, ipsum dolor sit amet...
                  </p>
              ),
              action: <NavButton color="chartreuse" to={sections[1].path} exact>User Experience</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: sections[1].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={1}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection(sections[0].path)}
            onSwipingLeft={this.changeSection(sections[2].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.dark}
          >
            {{
              icon: <SectionIcon theme={themes.light} animationData={experienceData}/>,
              heading: <Heading theme={themes.dark}>User Experience</Heading>,
              subheading: <Subheading theme={themes.dark}>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton color="chartreuse" to={sections[2].path} exact>Creative</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: sections[2].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={2}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection(sections[1].path)}
            onSwipingLeft={this.changeSection(sections[3].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.dark}
          >
            {{
              icon: <SectionIcon theme={themes.light} animationData={creativeData}/>,
              heading: <Heading theme={themes.dark}>Creative</Heading>,
              subheading: <Subheading theme={themes.dark}>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton color="chartreuse" to={sections[3].path} exact>Interactive</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: sections[3].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={3}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection(sections[2].path)}
            onSwipingLeft={this.changeSection(sections[4].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.dark}
          >
            {{
              icon: <SectionIcon theme={themes.light} animationData={interactiveData}/>,
              heading: <Heading theme={themes.dark}>Interactive</Heading>,
              subheading: <Subheading theme={themes.dark}>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton color="chartreuse" to={sections[4].path} exact>Data/Insights</NavButton>
            }}
          </SwipeableSection>
        )}
        {matchPath(location.pathname, {path: sections[4].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={4}
            className={sectionStyle(this.props)}
            onSwipingRight={this.changeSection(sections[3].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
            theme={themes.dark}
          >
            {{
              icon: <SectionIcon theme={themes.light} animationData={insightsData}/>,
              heading: <Heading theme={themes.dark}>Data/Insights</Heading>,
              subheading: <Subheading theme={themes.dark}>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton color="chartreuse" to="/contact" exact>Contact Us</NavButton>
            }}
          </SwipeableSection>
        )}
        <Dots
          className={dotsStyle(this.props, this.state)}
          current={active}
          diameter={20}
          items={map(sections, 'path')}
          theme={themes.light}
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
