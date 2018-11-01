import * as React from 'react';
import { withTheme } from 'emotion-theming';
import { css } from 'emotion';

// helpers
import { Swipeable } from '../helpers/Swipeable';

// components
import { Section, Ref as SectionRef, Props as SectionProps } from './Section';
import { Ref as HeadingRef } from '../components/Heading';
import { Ref as SubheadingRef } from '../components/Subheading';
import { IconRef } from '../components/icons';

type Props = {
  readonly disabled?: boolean,
  readonly onAppear?: (refs: {[key: string]: React.Ref<any>}, cb: () => void) => void,
  readonly onEnter?: (refs: {[key: string]: React.Ref<any>}, direction: boolean, cb: () => void) => void,
  readonly onLeave?: (refs: {[key: string]: React.Ref<any>}, direction: boolean, cb: () => void) => void,
  readonly onMount?: (refs: {[key: string]: React.Ref<any>}) => void,
  readonly onSwipingLeft?: (e: React.TouchEvent<HTMLElement>, x: number) => void,
  readonly onSwipingRight?: (e: React.TouchEvent<HTMLElement>, x: number) => void,
  readonly transitionDirection?: {in: boolean, out: boolean} // false: backward, true: forward
} & SectionProps;

const style = (props: Partial<Props>) => css`
  z-index: 1;

  user-select: none;
  ${props.className}
`;

export class SwipeableSection extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    disabled: false,
    transitionDirection: {
      in: true,
      out: true,
    }
  };
  private components: {[key: string]: React.Ref<any>};

  constructor(props: Props) {
    super(props);

    this.components = {
      self: props.innerRef || React.createRef<SectionRef>(),
      icon: React.createRef<IconRef>(),
      heading: React.createRef<HeadingRef>(),
      subheading: React.createRef<SubheadingRef>(),
      content: React.createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) {
      onMount(this.components);
    }
  }

  componentWillAppear(cb: () => void) {
    const { onAppear } = this.props;
    if (onAppear) {
      onAppear(this.components, cb);
    } else {
      cb();
    }
  }

  componentWillEnter(cb: () => void) {
    const { onEnter, transitionDirection } = this.props;
    if (onEnter) {
      onEnter(this.components, transitionDirection.in, cb);
    } else {
      cb();
    }
  }

  componentWillLeave(cb: () => void) {
    const { onLeave, transitionDirection } = this.props;

    this.setState({
      disabled: true,
    });

    if (onLeave) {
      onLeave(this.components, transitionDirection.out, cb);
    } else {
      cb();
    }
  }

  render() {
    const { components, props } = this;
    const {
      index,
      variant,
      disabled,
      onSwipingLeft,
      onSwipingRight,
      children,
    } = this.props;

    return (
      <Swipeable
        disabled={disabled}
        onSwipingLeft={onSwipingLeft}
        onSwipingRight={onSwipingRight}
        render={(swipeState, swipeProps) => (
          <Section
            index={index}
            innerRef={components.self}
            className={style(props)}
            variant={variant}
            {...swipeProps}
            children={{
              icon: children.icon && React.cloneElement(children.icon, {innerRef: components.icon}),
              heading: children.heading && React.cloneElement(children.heading, {innerRef: components.heading}),
              subheading: React.cloneElement(children.subheading, {innerRef: components.subheading}),
              content: <div ref={components.content}>{children.content}</div>,
              action: children.action,
          }}/>
      )}/>
    );
  }
}
