import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { app } from './firebase';
import Header from './components/Header';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Edit from './pages/Edit';
import ContactSupport from './pages/ContactSupport';
import Qrpage from './pages/QRPage';

function App() {
  const auth = getAuth(app);

  useEffect(() => {
    console.log(auth)
  }, [auth]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen px-2 lg:px-0 overflow-hidden">
        <Header />
        <Switch>
          <Route exact path="/">
            {!auth?.currentUser ? <Home /> : <Landing />}
          </Route>
          <Route exact path="/auth/:type">
            {!auth?.currentUser ? <Redirect to="/" /> : <Auth />}
          </Route>
          <Route exact path="/page/:qrpageid">
            <Qrpage />
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