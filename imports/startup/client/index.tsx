import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { render } from 'react-dom';

// helpers
import { debounce } from 'lodash';

// stylesheets
import 'sanitize.css';
import '../../ui/theme/global';

import { AppContainer } from '../../ui/containers/AppContainer';

Meteor.startup(() => {
  const app = document.getElementById('app');
  render(<AppContainer/>, app);
});
