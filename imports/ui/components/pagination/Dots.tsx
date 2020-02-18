import * as React from 'react';
import { motion, useSpring, MotionProps } from 'framer-motion';

const DOT_DIAMETER = 16;
const DOT_SPACE = 10;
const OUTLINE_WIDTH = 2;

type Item = any;
type Props = {
  readonly compare?: (items: Array<Item>, item: Item) => number,
  readonly current: Item,
  readonly diameter?: number,
  readonly items: Array<Item>,
  readonly space?: number,
  readonly vertical?: boolean,
};

export const Dots: React.FC<Props> = (props: Props) => {
  const {
    compare = (all: string[], it: string) => all.indexOf(it),
    current,
    diameter = DOT_DIAMETER,
    items,
    vertical = false,
    space = DOT_SPACE,
    ...rest
  } = props;

  const width = diameter + space;
  const height = width * items.length;

  const getOffset = (idx: number) => {
    return (idx * width) + (0.5 * width);
  };

  const offset = useSpring(getOffset(compare(items, current)), { damping: 12 });
  React.useEffect(() => {
    offset.set(getOffset(compare(items, current)));
  }, [current]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid slice"
      height={`${vertical ? height : width}px`}
      width={`${vertical ? width : height}px`}
      viewBox={`0 0 ${vertical ? width : height} ${vertical ? height : width}`}
      {...rest}
    >
      <g>
        {items.map((item, idx) => (
          <Dot
            key={`dot-${idx}`}
            radius={Math.round(diameter / 2)}
            x={vertical ? '50%' : getOffset(idx)}
            y={vertical ? getOffset(idx) : '50%'}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              }
            }}
          />
        ))}
        <Indicator
          width={Math.round(diameter / 1.5)}
          x={vertical ? '50%' : offset}
          y={vertical ? offset : '50%'}
          variants={{
            hidden: {
              opacity: 0,
              scale: 0,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.5,
              }
            }
          }}
        />
      </g>
    </motion.svg>
  );
};

type IndicatorProps = {
  width: number,
  x: number | string,
  y: number | string,
} & MotionProps;
const Indicator = ({ width, x, y, ...rest }: IndicatorProps) => (
  <motion.line
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeWidth={width}
    shapeRendering="geometricPrecision"
    x1={x}
    x2={x}
    y1={y}
    y2={y}
    {...rest}
  />
);

type DotProps = {
  radius: number,
  x: number | string,
  y: number | string,
} & MotionProps;
const Dot = ({ x, y, radius, ...rest }: DotProps) => (
  <motion.circle
    fill="none"
    stroke="currentColor"
    strokeWidth={OUTLINE_WIDTH}
    shapeRendering="geometricPrecision"
    r={radius}
    cx={x}
    cy={y}
    {...rest}
  />
);

Dots.defaultProps = {
  compare: (all: string[], it: string) => all.indexOf(it),
  diameter: DOT_DIAMETER,
  space: DOT_SPACE,
  vertical: false,
};
