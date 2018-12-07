// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import colors from 'shared/constants/colors';

type Props = {
  classes: Object,
};

const styles = theme => ({
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: colors.orange,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const LoginButton = ({ classes }: Props) => (
  <div className={classes.buttonContainer}>
    <Fab variant="extended" aria-label="Delete" className={classes.fab}>
      <NavigationIcon className={classes.extendedIcon} />
      Login
    </Fab>
  </div>
);

export default withStyles(styles)(LoginButton);
