// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import HomeList from './HomeList';
import HomeMainButton from './HomeMainButton';
import { createVersion } from './actions';

const mapStateToProps = ({ request }) => ({ request });
const mapDispatchToProps = {
  createVersion,
};

type Props = {
  classes: Object,
  createVersion: Function,
  request: Object,
};

type State = {};

const styles = theme => ({});

class Home extends Component<Props, State> {
  render() {
    const { createVersion, request } = this.props;
    return (
      <div>
        <HomeMainButton
          onClick={createVersion}
          requestPending={request.createVersion}
        />
        <HomeList />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
