// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    return <p>boop</p>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ignition);
