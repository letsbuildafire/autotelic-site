import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';
import { isEqual } from 'lodash';
import { Theme, ThemeVariant } from '../../theme';

// helpers
import { TimelineLite, Elastic, Power2 } from 'gsap';

type Props = {
  readonly className?: string,
  readonly current: number,
  readonly diameter?: number,
  readonly space?: number,
  readonly items: Array<string>,
  readonly orientation?: 'vertical' | 'horizontal',
  readonly theme?: Theme,
  readonly variant?: ThemeVariant,
};

const style = (props: Partial<Props>) => css`
  ${props.orientation === 'vertical'
    ? `
    width: ${props.diameter}px;
    height: auto;
    `
    : `
    width: auto;
    height: ${props.diameter}px;
    `
  }

  color: ${props.theme.color.body};

  ${props.className}
`;

export class Element extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    diameter: 24,
    items: [],
    orientation: 'horizontal',
    space: 6,
    variant: 'light',
  };
  private line = React.createRef<SVGLineElement>();

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateActiveDot();
  }

  shouldComponentUpdate(nextProps: Props) {
    if (isEqual(this.props, nextProps)) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this.updateActiveDot();
  }

  updateActiveDot() {
    const { line } = this;
    const { diameter, orientation, items, current } = this.props;
    const offset = (current / items.length * 100) + (1 / items.length * 50);

    const tl = new TimelineLite();
    tl.kill(line.current);
    tl.to(line.current, 0.3, {
      attr: (orientation === 'vertical'
        ? {
          y2: `${offset}%`
        }
        : {
          x2: `${offset}%`
        }
      ),
      strokeWidth: 0,
      ease: Power2.easeIn
    }).to(line.current, 1, {
      attr: (orientation === 'vertical'
        ? {
          y1: `${offset}%`
        }
        : {
          x1: `${offset}%`
        }
      ),
      ease: Elastic.easeOut.config(1, 0.76)
    }, '+=0')
      .to(line.current, 2, {
      strokeWidth: diameter / 2,
      ease: Elastic.easeOut.config(1, 0.8)
    }, '-=1');

    tl.timeScale(2);
  }

  render() {
    const { items, diameter, space, ...props } = this.props;

    const height = diameter + Math.round(diameter / 4);
    const width = Math.round(items.length * height + (items.length * space));
    const offset = idx =>
      (idx / items.length * 100) + (1 / items.length * 50);

    return (
      <svg
        className={style(this.props)}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid slice"
        viewBox={props.orientation === 'vertical'
          ? `0 0 ${height} ${width}`
          : `0 0 ${width} ${height}`
        }
      >
        <g>
          <g fill="transparent" strokeWidth={Math.round(diameter / 8)}>
            {items.map((item, idx) => (
              <Dot
                key={idx}
                x={props.orientation === 'vertical' ? '50%' : `${offset(idx)}%`}
                y={props.orientation === 'vertical' ? `${offset(idx)}%` : '50%'}
                diameter={diameter}
                label={item}
              />
            ))}
          </g>
          <line
            ref={this.line}
            className={dotStyle({})}
            fill="none"
            strokeWidth={Math.round(diameter / 8)}
            strokeLinecap="round"
            strokeMiterlimit={diameter}
            x1={props.orientation === 'vertical' ? '50%' : `${offset(0)}%`}
            y1={props.orientation === 'vertical' ? `${offset(0)}%` : '50%'}
            x2={props.orientation === 'vertical' ? '50%' : `${offset(0)}%`}
            y2={props.orientation === 'vertical' ? `${offset(0)}%` : '50%'}
          />
        </g>
      </svg>
    );
  }
}

export const Dots = withTheme<Props, Theme>(Element);

type DotProps = {
  label: string,
  diameter: number,
  x: number | string,
  y: number | string,
};

const dotStyle = (props: Partial<DotProps>) => css`
  stroke: currentColor;

  transition: color 200ms ease-out;
`;

const Dot: React.SFC<DotProps> = (props: DotProps, context) => (
  <circle
    cx={props.x}
    cy={props.y}
    className={dotStyle(props)}
    fill="none"
    r={Math.round(props.diameter / 2)}
    shapeRendering="geometricPrecision"
  />
);
