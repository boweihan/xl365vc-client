// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import KeyboardTab from '@material-ui/icons/KeyboardTab';
import Button from '@material-ui/core/Button';
import Locale from 'shared/localization';
import Progress from 'core/Progress';

type Props = {
  classes: Object,
  onClick: Function,
  requestPending: boolean,
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

const LoginButton = ({ classes, onClick, requestPending }: Props) => (
  <Button
    variant="contained"
    size="medium"
    className={classes.button}
    onClick={onClick}
  >
    {requestPending ? (
      <Progress />
    ) : (
      <React.Fragment>
        <KeyboardTab className={classes.extendedIcon} />
        {Locale.login}
      </React.Fragment>
    )}
  </Button>
);

export default withStyles(styles)(LoginButton);
