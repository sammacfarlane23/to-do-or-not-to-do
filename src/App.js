import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitsPage from './components/HabitsPage';
import Header from './components/Header';

import { GlobalProvider } from './context/GlobalState';

export default () => {
  return (
    <GlobalProvider>
      <Header />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/habits' component={HabitsPage} />
      </Switch>
    </GlobalProvider>
  );
};
