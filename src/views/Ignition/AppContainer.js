// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object,
  children: any,
};

const styles = theme => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#EEEEEE',
    border: '10px solid white',
  },
});

const AppContainer = ({ classes, children }: Props) => (
  <div className={classes.appContainer}>{children}</div>
);

export default withStyles(styles)(AppContainer);
