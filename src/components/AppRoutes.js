import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, IndexRoute} from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import GamePage from './GamePage';
import RegionView from './RegionView';

export default class AppRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={IndexPage}/>
            <Route exact path="/:game/" component={GamePage}/>
            <Route exact path="/:game/map/:region/" component={RegionView}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
