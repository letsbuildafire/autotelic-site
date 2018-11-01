import * as React from 'react';
import DetectPassiveEvents from 'detect-passive-events';

type Props = {
  readonly render: (state: State, props: InjectedSwipeableProps) => React.ReactElement<any>,
  readonly onSwiped?: (e: React.TouchEvent<HTMLElement>, dx: number, dy: number, flick: boolean, v: number) => void,
  readonly onSwiping?: (e: React.TouchEvent<HTMLElement>, dx: number, dy: number, x: number, y: number, v: number) => void,
  readonly onSwipingUp?: (e: React.TouchEvent<HTMLElement>, y: number) => void,
  readonly onSwipingRight?: (e: React.TouchEvent<HTMLElement>, x: number) => void,
  readonly onSwipingDown?: (e: React.TouchEvent<HTMLElement>, y: number) => void,
  readonly onSwipingLeft?: (e: React.TouchEvent<HTMLElement>, x: number) => void,
  readonly onSwipedUp?: (e: React.TouchEvent<HTMLElement>, dy: number, flick: boolean) => void,
  readonly onSwipedRight?: (e: React.TouchEvent<HTMLElement>, dx: number, flick: boolean) => void,
  readonly onSwipedDown?: (e: React.TouchEvent<HTMLElement>, dy: number, flick: boolean) => void,
  readonly onSwipedLeft?: (e: React.TouchEvent<HTMLElement>, dx: number, flick: boolean) => void,
  readonly onTap?: (e: React.TouchEvent<HTMLElement>) => void,
  readonly onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void,
  readonly delta?: number,
  readonly flickThreshold?: number,
  readonly preventDefaultTouchmoveEvent?: boolean,
  readonly rotationAngle?: number,
  readonly stopPropagation?: boolean,
  readonly trackMouse?: boolean,
  disabled?: boolean,
};

export type InjectedSwipeableProps = {
  onMouseDown?: (e: React.MouseEvent<HTMLElement>) => void,
  onTouchStart?: (e: React.TouchEvent<HTMLElement>) => void,
  onTouchMove?: (e: React.TouchEvent<HTMLElement>) => void,
  onTouchEnd?: (e: React.TouchEvent<HTMLElement>) => void,
};

type State = Readonly<typeof initialState>;
const initialState = {
  x: null,
  y: null,
  swiping: false,
  start: 0,
  rotationAngle: 0,
};

export class Swipeable extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    flickThreshold: 0.4,
    delta: 10,
    preventDefaultTouchmoveEvent: false,
    stopPropagation: false,
    trackMouse: false,
    disabled: false,
    rotationAngle: 0,
  };
  private ref: React.RefObject<React.ReactElement<InjectedSwipeableProps>>;
  private hasPassiveSupport;

  constructor(props, context) {
    super(props, context);

    // setup internal state
    this.state = initialState;

    const { innerRef } = props;
    this.ref = innerRef || React.createRef<React.ReactElement<InjectedSwipeableProps>>();

    // bind this context for internal methods
    this.eventStart = this.eventStart.bind(this);
    this.eventMove = this.eventMove.bind(this);
    this.eventEnd = this.eventEnd.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.cleanupMouseListeners = this.cleanupMouseListeners.bind(this);
    this.setupMouseListeners = this.setupMouseListeners.bind(this);
    this.setupTouchmoveEvent = this.setupTouchmoveEvent.bind(this);
    this.cleanupTouchmoveEvent = this.cleanupTouchmoveEvent.bind(this);

    // check for passive event support
    this.hasPassiveSupport = DetectPassiveEvents.hasSupport;
  }

  getMovingPosition(e) {
    return 'changedTouches' in e
      ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  }

  getPosition(e) {
    return 'touches' in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  }

  rotateByAngle(pos, angle) {
    if (angle === 0) {
      return pos;
    }

    const { x, y } = pos;

    const angleInRadians = (Math.PI / 180) * angle;
    const rotatedX = x * Math.cos(angleInRadians) + y * Math.sin(angleInRadians);
    const rotatedY = y * Math.cos(angleInRadians) - x * Math.sin(angleInRadians);
    return { x: rotatedX, y: rotatedY };
  }

  calculatePos(e, state) {
    const { x, y } = this.rotateByAngle(this.getMovingPosition(e), state.rotationAngle);

    const deltaX = state.x - x;
    const deltaY = state.y - y;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    const time = Date.now() - state.start;
    const velocity = Math.sqrt(absX * absX + absY * absY) / time;

    return { deltaX, deltaY, absX, absY, velocity };
  }

  componentDidMount() {
    // if we care about calling preventDefault and we have support for passive events
    // we need to setup a custom event listener, sigh...
    // there are a few jump ropes within the code for this case,
    // but it is the best we can do to allow preventDefault for chrome 56+
    if (this.props.preventDefaultTouchmoveEvent) {
      this.setupTouchmoveEvent();
    }
  }

  componentDidUpdate(prevProps) {
    // swipeable toggled either on/off, so stop tracking swipes and clean up
    if (prevProps.disabled !== this.props.disabled) {
      this.cleanupMouseListeners();
      // reset internal swipeable state
      this.setState({
        ...initialState
      });
    }

    // preventDefaultTouchmoveEvent toggled off - clean up touch move if needed
    if (prevProps.preventDefaultTouchmoveEvent && !this.props.preventDefaultTouchmoveEvent) {
      this.cleanupTouchmoveEvent();

    // preventDefaultTouchmoveEvent toggled on - add touch move if needed
    } else if (!prevProps.preventDefaultTouchmoveEvent && this.props.preventDefaultTouchmoveEvent) {
      this.setupTouchmoveEvent();
    }
  }

  componentWillUnmount() {
    this.cleanupMouseListeners();
  }

  setupTouchmoveEvent() {
    if (this.ref.current && this.hasPassiveSupport) {
      // @ts-ignore: fix later
      this.ref.current.addEventListener('touchmove', this.eventMove, { passive: false });
    }
  }

  setupMouseListeners() {
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  cleanupTouchmoveEvent() {
    if (this.ref.current && this.hasPassiveSupport) {
      // @ts-ignore: fix later
      this.ref.current.removeEventListener('touchmove', this.eventMove, { passive: false });
    }
  }

  cleanupMouseListeners() {
    // safe to call, if no match is found has no effect
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }

  mouseDown(e) {
    const { trackMouse, onMouseDown } = this.props;

    if (!trackMouse || e.type !== 'mousedown') {
      return;
    }

    if (typeof onMouseDown === 'function') {
      onMouseDown(e);
    }

    // setup document listeners to track mouse movement outside <Swipeable>'s area
    this.setupMouseListeners();
    this.eventStart(e);
  }

  mouseMove(e) {
    this.eventMove(e);
  }

  mouseUp(e) {
    this.cleanupMouseListeners();
    this.eventEnd(e);
  }

  eventStart(e) {
    // if more than a single touch don't track, for now...
    if (e.touches && e.touches.length > 1) {
      return;
    }

    const { stopPropagation, rotationAngle } = this.props;
    const { x, y } = this.rotateByAngle(this.getPosition(e), rotationAngle);

    if (stopPropagation) {
      e.stopPropagation();
    }

    this.setState({
      start: Date.now(),
      x,
      y,
      swiping: false,
      rotationAngle
    });
  }

  eventMove(e) {
    const {
      delta,
      onSwiping,
      onSwiped,
      onSwipingLeft,
      onSwipedLeft,
      onSwipingRight,
      onSwipedRight,
      onSwipingUp,
      onSwipedUp,
      onSwipingDown,
      onSwipedDown,
      preventDefaultTouchmoveEvent,
      stopPropagation,
    } = this.props;

    if (!this.state.x || !this.state.y || e.touches && e.touches.length > 1) {
      return;
    }

    const pos = this.calculatePos(e, this.state);

    // if swipe is under delta and we have not already started to track a swipe: return
    if (pos.absX < delta && pos.absY < delta && !this.state.swiping) {
      return;
    }

    if (stopPropagation) {
      e.stopPropagation();
    }

    if (onSwiping) {
      onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity);
    }

    // track if a swipe is cancelable
    // so we can call prevenDefault if needed
    let cancelablePageSwipe = false;
    if (onSwiping || onSwiped) {
      cancelablePageSwipe = true;
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (onSwipingLeft || onSwipedLeft) {
          if (onSwipingLeft) {
            onSwipingLeft(e, pos.absX);
          }
          cancelablePageSwipe = true;
        }
      } else if (onSwipingRight || onSwipedRight) {
        if (onSwipingRight) {
          onSwipingRight(e, pos.absX);
        }
        cancelablePageSwipe = true;
      }
    } else if (pos.deltaY > 0) {
      if (onSwipingUp || onSwipedUp) {
        if (onSwipingUp) {
          onSwipingUp(e, pos.absY);
        }
        cancelablePageSwipe = true;
      }
    } else if (onSwipingDown || onSwipedDown) {
      if (onSwipingDown) {
        onSwipingDown(e, pos.absY);
      }
      cancelablePageSwipe = true;
    }

    this.setState({
      swiping: true
    });

    if (cancelablePageSwipe && preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
  }

  eventEnd(e) {
    const {
      stopPropagation,
      flickThreshold,
      onSwiped,
      onSwipedLeft,
      onSwipedRight,
      onSwipedUp,
      onSwipedDown,
      onTap,
    } = this.props;

    if (this.state.swiping) {
      const pos = this.calculatePos(e, this.state);

      if (stopPropagation) {
        e.stopPropagation();
      }

      const isFlick = pos.velocity > flickThreshold;

      if (onSwiped) {
        onSwiped(e, pos.deltaX, pos.deltaY, isFlick, pos.velocity);
      }

      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          if (onSwipedLeft) {
            onSwipedLeft(e, pos.deltaX, isFlick);
          }
        } else {
          if (onSwipedRight) {
            onSwipedRight(e, pos.deltaX, isFlick);
          }
        }
      } else if (pos.deltaY > 0) {
        if (onSwipedUp) {
          onSwipedUp(e, pos.deltaY, isFlick);
        }
      } else {
        if (onSwipedDown) {
          onSwipedDown(e, pos.deltaY, isFlick);
        }
      }
    } else {
      if (onTap) {
        onTap(e);
      }
    }

    // finished swipe tracking, reset swipeable state
    this.setState({
      ...initialState
    });
  }

  render() {
    const {
      render,
      flickThreshold,
      delta,
      preventDefaultTouchmoveEvent,
      stopPropagation,
      trackMouse,
      disabled,
      rotationAngle,
      onSwiped,
      onSwiping,
      onSwipingUp,
      onSwipingRight,
      onSwipingDown,
      onSwipingLeft,
      onSwipedUp,
      onSwipedRight,
      onSwipedDown,
      onSwipedLeft,
      onTap,
      ...rest
    } = this.props;
    const props = rest as InjectedSwipeableProps;

    if (!disabled) {
      props.onTouchStart = this.eventStart;

      // if we do not care about calling preventDefault then assign onTouchMove prop
      // else we need to also check for passive support
      // and set a custom eventListener for touchmove on mount/update
      if (!preventDefaultTouchmoveEvent || !this.hasPassiveSupport) {
        props.onTouchMove = this.eventMove;
      }

      props.onTouchEnd = this.eventEnd;
      props.onMouseDown = this.mouseDown;
    }

    return render(this.state, props);
  }
}
