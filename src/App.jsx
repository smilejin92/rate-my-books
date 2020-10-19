import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
