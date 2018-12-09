// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from 'views/Login';
import { Home } from 'views/Home';
import { VersionList } from 'views/VersionList';
import AppContainer from './AppContainer';
import { updateRoute } from 'redux/actions/routeActions';
import type { Route } from 'shared/types/index';
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  LIST_VERSIONS_ROUTE,
} from 'shared/constants/routes';
import { getOrCreateDocumentId } from './actions';

const mapStateToProps = ({ ui }) => ({
  ui,
});

const mapDispatchToProps = {
  updateRoute,
  getOrCreateDocumentId,
};

type Props = {
  updateRoute: Function,
  ui: {
    route: Route,
  },
};

type State = {};

const componentMap = {
  [LOGIN_ROUTE]: <Login />,
  [HOME_ROUTE]: <Home />,
  [LIST_VERSIONS_ROUTE]: <VersionList />,
};

class Ignition extends Component<Props, State> {
  state = {};

  constructor(props) {
    super(props);
    this.checkIfDialog();
    props.getOrCreateDocumentId();
  }

  checkIfDialog = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const routeName = urlParams.get('route');
    if (routeName) {
      this.props.updateRoute({ name: routeName });
    }
  };

  getComponentFromRouteName = (name: string) => {
    let component = componentMap[name];
    if (this.props.ui.route && this.props.ui.route.props) {
      if (component) {
        component = React.cloneElement(component, this.props.ui.route.props);
      }
    }
    return component;
  };

  render() {
    const { ui } = this.props;
    const { name } = ui.route;
    return <AppContainer>{this.getComponentFromRouteName(name)}</AppContainer>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ignition);
