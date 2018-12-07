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
    height: '100vh',
  },
});

const AppContainer = ({ classes, children }: Props) => (
  <div className={classes.appContainer}>{children}</div>
);

export default withStyles(styles)(AppContainer);
