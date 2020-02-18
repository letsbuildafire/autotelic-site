import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';

// stylesheets
import 'sanitize.css';
import { App } from '../../ui/containers/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
