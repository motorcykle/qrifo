import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { ClipLoader } from 'react-spinners';
import Notfound from './pages/NotFound';

function App() {
  const user = useSelector(selectUser);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        const { uid, email } = user;
        dispatch(login({ uid, email }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    })

    return unsubscribe;
  }, [auth]);

  if (loading) return <div className='h-screen w-screen grid place-items-center'>
    <ClipLoader color="#1d1d1d" loading={loading} size={100} />
  </div>;

  return (
    <Router>
      <div className="flex flex-col min-h-screen px-2 lg:px-0 overflow-hidden">
        <Header />
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Landing />}
          </Route>
          <Route exact path="/auth/:type">
            {user ? <Redirect to="/" /> : <Auth />}
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
          <Route path="/*">
            <Notfound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function PrivateRoute({ children, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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