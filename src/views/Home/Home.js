// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import HomeList from './HomeList';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

type Props = {
  classes: Object,
};

type State = {};

const styles = theme => ({});

class Home extends Component<Props, State> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <HomeList />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
