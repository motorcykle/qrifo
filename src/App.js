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
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import { app } from './firebase';
import Home from './pages/Home';
import Edit from './pages/Edit';
import ContactSupport from './pages/ContactSupport';

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
          <Route exact path="/">
            {!auth?.currentUser ? <Home /> : <Landing />}
          </Route>
          <Route exact path="/auth/:type">
            {!auth?.currentUser ? <Redirect to="/" /> : <Auth />}
          </Route>
          <PrivateRoute exact path="/edit/:qrpageid">
            <Edit />
          </PrivateRoute>
          <PrivateRoute exact path="/contactsupport">
            <ContactSupport />
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
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}