import * as React from 'react';
import { css } from 'emotion';
import { mq } from '../../theme';

// helpers
import { FormikProps } from 'formik';

// components
import { Grid, GridRef } from '../grid';

export type Ref = HTMLElement;

export type Props = {
  readonly className?: string,
  readonly formik?: FormikProps<any>,
  readonly onAppear?: (el: HTMLElement, cb: () => void) => void,
  readonly onEnter?: (el: HTMLElement, direction: boolean, cb: () => void) => void,
  readonly onLeave?: (el: HTMLElement, direction: boolean, cb: () => void) => void,
  readonly onMount?: (el: HTMLElement) => void,
  readonly render: (ref: React.Ref<Ref>, formik?: FormikProps<any>) => React.ReactNode,
  readonly schema?: any, // expects a Yup validation schema
  readonly title?: string,
  readonly transitionDirection?: boolean, // false = backward, true = forward
};

export class Step extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    transitionDirection: true,
  };
  private ref = React.createRef<Ref>();

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.ref.current);
    }
  }

  componentWillAppear(cb: () => void) {
    if (this.props.onAppear) {
      this.props.onAppear(this.ref.current, cb);
    } else {
      cb();
    }
  }

  componentWillEnter(cb: () => void) {
    if (this.props.onEnter) {
      this.props.onEnter(this.ref.current, this.props.transitionDirection, cb);
    } else {
      cb();
    }
  }

  componentWillLeave(cb: () => void) {
    if (this.props.onLeave) {
      this.props.onLeave(this.ref.current, this.props.transitionDirection, cb);
    } else {
      cb();
    }
  }

  render() {
    const { render, formik } = this.props;

    return render(this.ref, formik);
  }
}
