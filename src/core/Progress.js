// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

type Props = {
  classes: Object,
};

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Progress(props: Props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

export default withStyles(styles)(Progress);
