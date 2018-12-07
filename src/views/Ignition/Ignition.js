// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginButton } from 'views/Login';
import AppContainer from './AppContainer';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

type Props = {};
type State = {};

class Ignition extends Component<Props, State> {
  state = {};

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize = () => {};

  render() {
    return (
      <AppContainer>
        <LoginButton />
      </AppContainer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ignition);
