import * as React from 'react';
import { css } from 'emotion';
import { Breakpoints, mq } from '../../theme/media';

// helpers
import * as Lottie from 'lottie-web';

export type Ref = HTMLDivElement;
export type Props = {
  readonly animationData: any,
  readonly autoplay?: boolean,
  readonly className?: string,
  readonly height?: {[key in Breakpoints]?: number | string} | string | number,
  readonly innerRef?: React.Ref<Ref>,
  readonly loop?: boolean,
  readonly renderer?: 'svg' | 'canvas',
  readonly rendererSettings?: {
    preserveAspectRatio?: string,
    scaleMode?: string,
  }
  readonly speed?: number,
  readonly width?: {[key in Breakpoints]?: number | string} | string | number,
};

type State = Readonly<typeof initialState>;
const initialState = {
  speed: 0.25,
  stopped: true,
  paused: false,
  complete: false,
};

const baseValue = (breakpoint: Breakpoints, prop: any, value: any = false): any => {
  if (typeof prop === 'string') {
    return prop;
  }

  return (breakpoint in prop) ? prop[breakpoint] : value;
};

const getSize = (initial: number | string) => (typeof initial === 'number')
  ? `${initial}px`
  : initial;

const style = (props: Partial<Props>) => css`
  height: ${getSize(baseValue('xs', props.height, 'initial'))};
  width: ${getSize(baseValue('xs', props.width, 'initial'))};
  overflow: visible;
  margin: 0 auto;

  outline: none;
  user-select: none;

  ${mq.sm(css`
    ${typeof props.height === 'object' && props.height.sm && `
      height: ${getSize(props.height.sm)};
    `}
    ${typeof props.width === 'object' && props.width.sm && `
      width: ${getSize(props.width.sm)};
    `}
  `)}

  ${mq.md(css`
    ${typeof props.height === 'object' && props.height.md && `
      height: ${getSize(props.height.md)};
    `}
    ${typeof props.width === 'object' && props.width.md && `
      width: ${getSize(props.width.md)};
    `}
  `)}

  ${mq.lg(css`
    ${typeof props.height === 'object' && props.height.lg && `
      height: ${getSize(props.height.lg)};
    `}
    ${typeof props.width === 'object' && props.width.lg && `
      width: ${getSize(props.width.lg)};
    `}
  `)}

  ${mq.xl(css`
    ${typeof props.height === 'object' && props.height.xl && `
      height: ${getSize(props.height.xl)};
    `}
    ${typeof props.width === 'object' && props.width.xl && `
      width: ${getSize(props.width.xl)};
    `}
  `)}

  ${props.className}
`;

export class Icon extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    autoplay: true,
    height: 'auto',
    loop: false,
    renderer: 'svg',
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      scaleMode: 'noScale',
    },
    width: 'auto',
  };
  private ref: React.RefObject<Ref>;
  private animation: any;

  constructor(props) {
    super(props);

    const { innerRef, autoplay, speed } = props;

    this.ref = innerRef || React.createRef<Ref>();
    this.state = {
      ...initialState,
      stopped: !autoplay,
      paused: !autoplay,
      speed: !!speed ? speed : initialState.speed,
    };
  }

  componentDidMount() {
    const { width, height, ...params } = this.props;

    this.animation = Lottie.loadAnimation({
      container: this.ref.current,
      ...params
    });

    this.registerEvents([
      {
        eventName: 'DOMLoaded',
        callback: () => this.startAnimation(),
      },
      {
        eventName: 'complete',
        callback: () => this.endAnimation(),
      }
    ]);
  }

  componentWillUnmount() {
    this.deRegisterEvents([
      {
        eventName: 'DOMLoaded',
        callback: () => this.startAnimation(),
      },
      {
        eventName: 'complete',
        callback: () => this.endAnimation(),
      }
    ]);

    this.destroy();
    this.animation = null;
  }

  startAnimation = () => {
    const { speed } = this.state;

    this.animation.setSpeed(speed);
    this.animation.play();
  }

  endAnimation = () => {
    // callback prop?
  }

  registerEvents(listeners) {
    listeners.forEach((listener) => {
      this.animation.addEventListener(listener.eventName, listener.callback);
    });
  }

  deRegisterEvents(listeners) {
    listeners.forEach((listener) => {
      this.animation.removeEventListener(listener.eventName, listener.callback);
    });
  }

  destroy() {
    this.animation.destroy();
  }

  render() {
    return (
      <div ref={this.ref} className={style(this.props)} tabIndex={0}/>
    );
  }
}
