// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import classNames from 'classnames';
import Locale from 'shared/localization';
import Logo from 'core/assets/logo.png';
import { login } from 'views/Login/actions.js';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  login,
};

type Props = {
  classes: Object,
  login: Function,
};

type State = {
  account: string,
  password: string,
  showPassword: boolean,
};

const styles = theme => ({
  logo: {
    width: '80%',
    margin: '10%',
  },
  loginContainer: {
    display: 'flex',
    alignSelf: 'center',
    textAlign: 'center',
  },
  formBackground: {
    backgroundColor: 'white',
    with: '80%',
    margin: '5%',
    padding: '5%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class Login extends Component<Props, State> {
  state = {
    account: '',
    password: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    const { account, password } = this.state;
    return (
      <div className={classes.loginContainer}>
        <div className={classes.formBackground}>
          <TextField
            className={classNames(classes.margin, classes.textField)}
            label="Account"
            value={this.state.account}
            onChange={this.handleChange('account')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <VerifiedUser />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className={classNames(classes.margin, classes.textField)}
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            value={this.state.password}
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={Locale.togglePasswordVisibilty}
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoginButton onClick={() => this.props.login(account, password)} />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
