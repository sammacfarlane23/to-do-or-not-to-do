import React from 'react';
import Application from './components/Application';

import UserProvider from './context/UserProvider';

export default () => {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
};
