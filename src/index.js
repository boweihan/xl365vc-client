// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from 'shared/store/configureStore';
import { VBThemeProvider } from 'shared/themes/withVBTheme';
import colors from 'shared/constants/colors';
import type { Theme } from 'shared/types';

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}

const Office = window.Office;

const theme: Theme = {
  colors,
};

let elem = document.getElementById('root');

let render = () => {
  const Ignition = require('views/Ignition').default;
  if (elem) {
    ReactDOM.render(
      <VBThemeProvider theme={theme}>
        <Provider store={store}>
          <Ignition />
        </Provider>
      </VBThemeProvider>,
      elem,
    );
  }
};

Office.initialize = () => {
  render();

  // $FlowFixMe
  if (module.hot) {
    module.hot.accept('views/Ignition', () => {
      setTimeout(render);
    });
  }
};

registerServiceWorker();
