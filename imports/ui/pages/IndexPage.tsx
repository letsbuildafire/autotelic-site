import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';

// helpers
import { TweenLite } from 'gsap';

// components
import { Page, Ref as PageRef } from '../components/Page';
import Sandbox2 from '../components/Sandbox2';

// effects
import Tilt from '../effects/Tilt';

type IndexPageProps = {
  history?: History,
  location?: Location,
};

const style = (props: IndexPageProps) => css``;

export class IndexPage extends React.Component<IndexPageProps> {
  private ref = React.createRef<PageRef>();

  constructor(props) {
    super(props);
  }

  componentWillAppear(cb) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      x: -10
    }, {
      opacity: 1,
      x: 0,
      onComplete: cb
    });
  }

  componentWillEnter(cb) {
    TweenLite.fromTo(this.ref.current, 0.3, {
      opacity: 0,
      x: -10
    }, {
      opacity: 1,
      x: 0,
      onComplete: cb
    });
  }

  componentWillLeave(cb) {
    TweenLite.to(this.ref.current, 0.3, {
      y: 100,
      onComplete: cb,
    });
  }

  render() {
    return (
      <Page className={style(this.props)} innerRef={this.ref}>
        <Tilt className="tilt" options={{ max : 50 }} style={{ height: '100%', width: '100%' }}>
          <Sandbox2></Sandbox2>
        </Tilt>
      </Page>
    );
  }
}
