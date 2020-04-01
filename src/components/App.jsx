import React, { Fragment } from 'react';
import { Container, LinearProgress } from '@material-ui/core';

import useGlobalState from '../useGlobalState';

import Home from './Home';

const App = (props) => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <Fragment>
      {isLoading && <LinearProgress />}
      <Container maxWidth="lg">
        <Home />
      </Container>
    </Fragment>
  );
};

export default App;
