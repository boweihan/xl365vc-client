// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

type Props = {
  classes: Object,
  onClick: Function,
};

const styles = {
  root: {
    flexGrow: 1,
  },
};

function VersionListBar({ classes, onClick }: Props) {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <IconButton
              onClick={onClick}
              className={classes.menuButton}
              color="inherit"
              aria-label="Back"
            >
              <KeyboardBackspace />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(VersionListBar);
