// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import KeyboardTab from '@material-ui/icons/KeyboardTab';
import Button from '@material-ui/core/Button';
import Locale from 'shared/localization';

type Props = {
  classes: Object,
  onClick: Function,
};

const styles = theme => ({
  button: {
    width: '90%',
    marginTop: 20,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const LoginButton = ({ classes, onClick }: Props) => (
  <Button
    variant="contained"
    size="medium"
    className={classes.button}
    onClick={onClick}
  >
    <KeyboardTab className={classes.extendedIcon} />
    {Locale.login}
  </Button>
);

export default withStyles(styles)(LoginButton);
