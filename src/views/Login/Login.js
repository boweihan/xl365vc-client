// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

type Props = {};
type State = {};

class Login extends Component<Props, State> {
  state = {};

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize = () => {};

  render() {
    return (
      <a href="https://accounts.google.com/ServiceLogin/signinchooser?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
        boop
      </a>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
