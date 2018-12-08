// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FileCopy from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import VersionListBackBar from './VersionListBackBar';
import { updateRoute } from 'redux/actions/routeActions';
import { HOME_ROUTE } from 'shared/constants/routes';
import Locale from 'shared/localization';
import { deleteVersion } from './actions';

const mapStateToProps = ({ version }) => ({ version });
const mapDispatchToProps = {
  updateRoute,
  deleteVersion,
};

type Props = {
  classes: Object,
  version: Object,
  updateRoute: Function,
  deleteVersion: Function,
};

type State = {};

const styles = theme => ({
  versionListContainer: {
    width: '90%',
    margin: '5%',
    backgroundColor: theme.palette.background.paper,
  },
  listItemText: {
    overflow: 'scroll',
    margin: 10,
    padding: 0,
  },
});

class VersionList extends Component<Props, State> {
  render() {
    const { classes, version, updateRoute, deleteVersion } = this.props;
    return (
      <div className={classes.versionListContainer}>
        <VersionListBackBar onClick={() => updateRoute({ name: HOME_ROUTE })} />
        <List>
          {version.fileVersions.map((fileVersion, i) => {
            return (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <FileCopy />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary={fileVersion.name}
                  secondary={new Date().getTime()}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label={Locale.delete}
                    onClick={() => deleteVersion(fileVersion.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VersionList));
