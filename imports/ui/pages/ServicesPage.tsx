import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';
import { debounce, findIndex, map } from 'lodash';
import { matchPath } from 'react-router';

// helpers
import { TweenLite, TimelineLite } from 'gsap';
import * as TransitionGroupPlus from 'react-transition-group-plus';
import { Transitionable } from '../helpers/Transitionable';

// components
import { Page, Ref as PageRef } from '../components/Page';
import { SwipeableSection } from '../containers/SwipeableSection';
import { SectionIcon } from '../components/icons';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { NavButton } from '../components/buttons';
import { Dots } from '../components/pagination';
import { Eyecatch, Ref as EyecatchRef } from '../components/Eyecatch';

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

  ${state.active > 0 && `
    color: red;
  `}
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
  private eyecatch = React.createRef<EyecatchRef>();

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

  componentDidMount() {
    TweenLite.set(this.ref.current, {
      opacity: 0,
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { sections, location } = this.props;
    const { location: from } = prevProps;
    const { active: previous } = prevState;

    if (location.pathname !== from.pathname) {
      this.setState({
        active: this.getSectionIndex(location.pathname),
        previous,
      });
    }
  }

  componentWillAppear(cb: () => void) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      y: '20px',
    }, {
      opacity: 1,
      y: 0,
      onComplete: cb
    });
  }

  componentWillEnter(cb: () => void) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      y: '20px',
    }, {
      opacity: 1,
      y: 0,
      onComplete: cb
    });
  }

  componentWillLeave(cb: () => void) {
    TweenLite.set(this.ref.current, {
      position: 'absolute',
    });

    TweenLite.to(this.ref.current, 0.3, {
      opacity: 0,
      y: '-20px',
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
          <Transitionable
            onMount={() => {
              TweenLite.set(this.eyecatch.current, {
                scale: 1.2,
                opacity: 0,
              });
            }}
            onAppear={() => {
              TweenLite.to(this.eyecatch.current, 0.3, {
                scale: 1,
                opacity: 1,
                clearProps: 'transform, opacity',
              });
            }}
            onEnter={cb => {
              TweenLite.fromTo(this.eyecatch.current, 0.3, {
                scale: 1.2,
                opacity: 0,
              }, {
                scale: 1,
                opacity: 1,
                clearProps: 'transform, opacity',
                onComplete: cb,
              });
            }}
            onLeave={cb => {
              TweenLite.to(this.eyecatch.current, 0.3, {
                scale: 1.2,
                opacity: 0,
                delay: 0.45,
                clearProps: 'transform, opacity',
                onComplete: cb,
              });
            }}
            render={state => (
              <Eyecatch
                innerRef={this.eyecatch}
                className={css`
                  z-index: -1;
                  position: absolute;
                  top: 50%;
                  left: 50%;

                  height: auto;
                  width: 350vw;

                  transform: translate3d(-45%, -60%, 0);
                  transform-origin: 50%, 100%;
                  `}
                />
          )} />
        )}
        {matchPath(location.pathname, {path: sections[0].path, strict: false, exact: true}) && (
          <SwipeableSection
            index={0}
            variant="light"
            className={sectionStyle(this.props)}
            onSwipingLeft={this.changeSection(sections[1].path)}
            onMount={sectionMount}
            onAppear={sectionAppear}
            onEnter={sectionEnter}
            onLeave={sectionLeave}
          >
            {{
              heading: <Heading variant="light">Services</Heading>,
              subheading: <Subheading variant="light">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Subheading>,
              content: (
                  <p>
                    Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                    sit amet consectetur. Lorem, ipsum dolor sit amet...
                  </p>
              ),
              action: <NavButton to={sections[1].path} exact>User Experience</NavButton>
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
          >
            {{
              icon: <SectionIcon animationData={experienceData}/>,
              heading: <Heading>User Experience</Heading>,
              subheading: <Subheading>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton to={sections[2].path} exact>Creative</NavButton>
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
          >
            {{
              icon: <SectionIcon animationData={creativeData}/>,
              heading: <Heading>Creative</Heading>,
              subheading: <Subheading>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton to={sections[3].path} exact>Interactive</NavButton>
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
          >
            {{
              icon: <SectionIcon animationData={interactiveData}/>,
              heading: <Heading>Interactive</Heading>,
              subheading: <Subheading>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton to={sections[4].path} exact>Data/Insights</NavButton>
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
          >
            {{
              icon: <SectionIcon animationData={insightsData}/>,
              heading: <Heading>Data/Insights</Heading>,
              subheading: <Subheading>Lorem ipsum dolor sit, amet consectetur.</Subheading>,
              content: (
                <p>
                  Lorem, ipsum dolor sit amet consectetur! Lorem, ipsum dolor
                  sit amet consectetur. Lorem, ipsum dolor sit amet...
                </p>
              ),
              action: <NavButton to="/contact" exact>Contact Us</NavButton>
            }}
          </SwipeableSection>
        )}
        <Dots
          className={dotsStyle(this.props, this.state)}
          current={active}
          diameter={20}
          items={map(sections, 'path')}
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
