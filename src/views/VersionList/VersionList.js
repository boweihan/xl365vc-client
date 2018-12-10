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
import Progress from 'core/Progress';
import moment from 'moment';

const mapStateToProps = ({ version, request }) => ({ version, request });
const mapDispatchToProps = {
  updateRoute,
  deleteVersion,
};

type Props = {
  classes: Object,
  version: Object,
  request: Object,
  updateRoute: Function,
  deleteVersion: Function,
};

type State = {};

const styles = theme => ({
  versionListContainer: {
    height: '100%',
  },
  versionList: {
    width: '90%',
    margin: '5%',
    backgroundColor: theme.palette.background.paper,
    maxHeight: '90vh',
    overflow: 'scroll',
  },
  listItemText: {
    overflow: 'scroll',
    margin: 10,
    padding: 0,
  },
});

class VersionList extends Component<Props, State> {
  render() {
    const {
      classes,
      version,
      request,
      updateRoute,
      deleteVersion,
    } = this.props;
    return (
      <div className={classes.versionListContainer}>
        <VersionListBackBar onClick={() => updateRoute({ name: HOME_ROUTE })} />
        <div className={classes.versionList}>
          {request.viewVersions ? (
            <Progress />
          ) : (
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
                      secondary={moment(fileVersion.lastModified).format(
                        'YYYY-MM-DD h:mm:ss a',
                      )}
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
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(VersionList));
