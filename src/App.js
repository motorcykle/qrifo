import React, { useEffect } from 'react';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import { app } from './firebase';
import Home from './pages/Home';

function App() {
  const auth = getAuth(app);

  useEffect(() => {
    console.log(auth)
  }, [auth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen px-2 md:px-0 overflow-hidden">
        <Header />
        <Switch>
          <Route path="/">
            {!auth?.currentUser ? <Home /> : <Landing />}
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  const { currentUser: user } = getAuth(app);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}