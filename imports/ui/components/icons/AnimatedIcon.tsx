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
  complete: false,
  direction: 1,
  paused: false,
  speed: 0.25,
  stopped: true,
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

  & path {
    fill: currentColor;
    stroke: currentColor;
  }

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

export class AnimatedIcon extends React.Component<Props, State> {
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
  private canvas: React.RefObject<Ref>;
  private animation: any;

  constructor(props) {
    super(props);

    const { autoplay, speed } = props;
    this.canvas = React.createRef<Ref>();

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
      container: this.canvas.current,
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

  public startAnimation() {
    const { autoplay } = this.props;
    const { speed } = this.state;

    this.animation.setSpeed(speed);

    if (autoplay) {
      this.animation.play();
    }
  }

  public endAnimation() {
    this.animation.pause();
  }

  public play() {
    this.animation.play();
  }

  public pause() {
    this.animation.pause();
  }

  public stop() {
    this.animation.stop();
  }

  public setSpeed(speed: number) {
    this.setState({
      speed,
    });

    this.animation.setSpeed(speed);
  }

  public setDirection(direction: 1 | -1) {
    this.setState({
      direction,
    });

    this.animation.setDirection(direction);
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
      <div ref={this.canvas} className={style(this.props)} tabIndex={0}/>
    );
  }
}
