import React, { useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Router } from '@reach/router';
import { UserContext } from '../context/UserProvider';
import Dashboard from './Dashboard';
import HabitsPage from './HabitsPage';
import Header from './Header';
import PasswordReset from './PasswordReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
import IntroductionPage from './IntroductionPage';

import { GlobalProvider } from '../context/GlobalState';

export default () => {
  const user = useContext(UserContext);
  const history = useHistory();

  return user ? (
    <GlobalProvider>
      <Header history={history} location={history.location.pathname} />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/habits' component={HabitsPage} />
      </Switch>
    </GlobalProvider>
  ) : (
    <div>
      <IntroductionPage />
      <Router>
        <SignUp exact path='signUp' />
        <SignIn path='/' />
        <PasswordReset path='passwordReset' />
      </Router>
    </div>
  );
};
