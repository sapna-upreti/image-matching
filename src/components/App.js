import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './Layout';
import IndexPage from './IndexPage';
import AdminPage from './AdminPage';
import { AthletePage } from './AthletePage';
import { NotFoundPage } from './NotFoundPage';
import athletes from '../data/athletes';

// const renderIndex = () => <IndexPage athletes={athletes} />;
const renderAthlete = ({ match, staticContext }) => {
  const id = match.params.id;
  const athlete = athletes.find(current => current.id === id);
  if (!athlete) {
    return <NotFoundPage staticContext={staticContext} />;
  }

  return <AthletePage athlete={athlete} athletes={athletes} />;
};

export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Layout>
);

export default App;
