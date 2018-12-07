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
import ApiService from 'shared/services/ApiService';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

type Props = {
  classes: Object,
};

type State = {
  account: string,
  password: string,
  showPassword: boolean,
};

const styles = theme => ({
  logo: {
    width: '100%',
  },
  loginContainer: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
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

  login = () => {
    const { account, password } = this.state;
    ApiService.login(account, password);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.loginContainer}>
        <img className={classes.logo} src={Logo} alt={Locale.logoAlt} />
        <TextField
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
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
          variant="outlined"
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
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoginButton onClick={this.login} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Login));
