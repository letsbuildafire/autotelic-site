import * as React from 'react';
import { History, Location } from 'history';
import { css } from 'emotion';
import { TweenLite } from 'gsap';

// components
import { Page } from '../components/Page';
import Sandbox2 from '../components/Sandbox2';

// effects
import Tilt from '../effects/Tilt';

type IndexPageProps = {
  history?: History,
  location?: Location,
};

const style = (props: IndexPageProps) => css`
  & > h1 {
    color: blue;
    font-size: 3.25rem;
  }
`;

export class IndexPage extends React.Component<IndexPageProps> {
  private el = React.createRef<HTMLElement>();

  constructor(props) {
    super(props);
  }

  componentWillAppear(cb) {
    TweenLite.fromTo(this.el.current, 0.3, {
      opacity: 0,
      x: -10
    }, {
      opacity: 1,
      x: 0,
      onComplete: cb
    });
  }

  componentWillEnter(cb) {
    TweenLite.fromTo(this.el.current, 0.3, {
      opacity: 0,
      x: -10
    }, {
      opacity: 1,
      x: 0,
      onComplete: cb
    });
  }

  componentWillLeave(cb) {
    TweenLite.to(this.el.current, 0.3, {
      y: 100,
      onComplete: cb,
    });
  }

  render() {
    return (
      <Page className={style(this.props)} ref={this.el}>
        <Tilt className="tilt" options={{ max : 50 }} style={{ height: '100%', width: '100%' }}>
              <div className="floatable">
                🍩
              </div>
              <div className="floatable floatable--shadow">
                🍩
              </div>
              <div className="floatable">
                <div className="child">
                  <div className="grandchild">
                  </div>
                </div>
              </div>
              <Sandbox2></Sandbox2>
            </Tilt>
      </Page>
    );
  }
}
