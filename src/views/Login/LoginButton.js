// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import colors from 'shared/constants/colors';
import Locale from 'shared/localization';

type Props = {
  classes: Object,
  onClick: Function,
};

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: colors.orange,
    borderRadius: 5,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const LoginButton = ({ classes, onClick }: Props) => (
  <Fab
    variant="extended"
    aria-label={Locale.delete}
    className={classes.fab}
    onClick={onClick}
  >
    <NavigationIcon className={classes.extendedIcon} />
    {Locale.login}
  </Fab>
);

export default withStyles(styles)(LoginButton);
