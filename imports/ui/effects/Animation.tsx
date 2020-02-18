import * as React from 'react';
import {
  default as Lottie,
  AnimationItem,
  AnimationEventName
} from 'lottie-web';

const ANIMATION_SPEED = 0.25;

type event = { event: AnimationEventName, callback: ([args]: any) => void };

type Element = React.SVGAttributes<SVGElement> | React.HTMLAttributes<HTMLCanvasElement>;
export type Props = {
  readonly animationData: any,
  readonly autoplay?: boolean,
  readonly className?: string,
  readonly events?: Array<event>,
  readonly loop?: boolean,
  readonly quality?: string | number,
  readonly renderer?: 'svg' | 'canvas',
  readonly rendererSettings?: {
    preserveAspectRatio?: string,
    scaleMode?: string,
  }
  readonly speed?: number,
} & Element;

export const Animation = React.forwardRef((props: Props, ref) => {
  const canvas = React.useRef();
  const animation = React.useRef<AnimationItem>();
  React.useImperativeHandle(ref, () => ({
    play: play,
    pause: pause,
    setSpeed: setSpeed,
  }));

  const {
    className,
    events,
    ...config
  } = props;

  const [ state, setState ] = React.useState({
    complete: false,
    direction: 1,
    events: events || [
      {
        event: 'DOMLoaded',
        callback: () => startAnimation(),
      },
      {
        event: 'complete',
        callback: () => endAnimation(),
      }
    ],
    paused: !props.autoplay,
    stopped: !props.autoplay,
    speed: !!props.speed ? props.speed : ANIMATION_SPEED,
  });

  React.useEffect(() => {
    animation.current = loadAnimation(config);
    startAnimation();
    addEvents();

    return () => {
      removeEvents();
    };
  }, [props.animationData]);

  const loadAnimation = (props: Partial<Props>) => {
    Lottie.setQuality(props.quality!);

    return Lottie.loadAnimation({
      container: canvas.current,
      ...props
    });
  };

  const startAnimation = () => {
    const { autoplay } = props;
    const { speed } = state;

    animation.current.setSpeed(speed);

    if (autoplay) {
      animation.current.play();
    }
  };

  const play = () => {
    animation.current && animation.current.play();
  };

  const pause = () => {
    animation.current && animation.current.pause();
  };

  const setSpeed = (speed: number) => {
    animation.current && animation.current.setSpeed(speed);
  };

  const endAnimation = () => {
    pause();
  };

  const addEvents = () => {
    if (!animation.current) { return; }
    state.events!.forEach(ev => animation.current.addEventListener(ev.event, ev.callback));
  };

  const removeEvents = () => {
    if (!animation.current) { return; }
    state.events!.forEach(ev => animation.current.removeEventListener(ev.event, ev.callback));
  };

  return (
    <div ref={canvas} tabIndex={0} className={className}/>
  );
});

Animation.defaultProps = {
  autoplay: true,
  height: 'auto',
  loop: false,
  quality: 'low',
  renderer: 'svg',
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    scaleMode: 'noScale',
  },
  width: 'auto',
};
