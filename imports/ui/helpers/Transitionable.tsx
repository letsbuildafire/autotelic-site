import * as React from 'react';

export type InjectedTransitionableProps = {};

type State = {};
type Props = {
  readonly onAppear?: (cb: () => void) => void,
  readonly onEnter?: (cb: () => void) => void,
  readonly onLeave?: (cb: () => void) => void,
  readonly onMount?: () => void,
  readonly render: (state: State, props: InjectedTransitionableProps) => React.ReactElement<any>,
};

export class Transitionable extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onMount } = this.props;
    if (onMount) {
      onMount();
    }
  }

  componentWillAppear(cb: () => void) {
    const { onAppear } = this.props;
    if (onAppear) {
      onAppear(cb);
    } else {
      cb();
    }
  }

  componentWillEnter(cb: () => void) {
    const { onEnter } = this.props;
    if (onEnter) {
      onEnter(cb);
    } else {
      cb();
    }
  }

  componentWillLeave(cb: () => void) {
    const { onLeave } = this.props;
    if (onLeave) {
      onLeave(cb);
    } else {
      cb();
    }
  }

  render() {
    const { render, onMount, onAppear, onEnter, onLeave, ...rest } = this.props;

    return render(this.state, rest);
  }
}
