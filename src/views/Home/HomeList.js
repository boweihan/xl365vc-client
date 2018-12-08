// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import ViewList from '@material-ui/icons/ViewList';
import Divider from '@material-ui/core/Divider';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Locale from 'shared/localization';
import { logout, createVersion } from './actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  logout,
  createVersion,
};

type Props = {
  classes: Object,
  logout: Function,
  createVersion: Function,
};
type State = {};

const styles = theme => ({
  root: {
    width: '90%',
    margin: '5%',
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleList extends Component<Props, State> {
  render() {
    const { classes, logout, createVersion } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary={Locale.viewVersions} />
          </ListItem>
          <ListItem button onClick={createVersion}>
            <ListItemIcon>
              <CreateNewFolder />
            </ListItemIcon>
            <ListItemText primary={Locale.createVersion} />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ArrowBack />
            </ListItemIcon>
            <ListItemText primary={Locale.logout} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SimpleList));
