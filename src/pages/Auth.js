import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';

const Auth = () => {
  const { type } = useParams();
  const history = useHistory();
  const auth = getAuth();


  if (!['signin', 'signup'].includes(type.toLowerCase())) history.push('/'); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handeSignIn = (e) => {
    if (password && email) {
      const signin = signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signin;
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        })
    }
  }

  const handleSignUp = (e) => {
    if (password !== confirmPassword) return alert('Passwords gotta match!');
    if (password && confirmPassword && email) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          e.target.reset();
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }

  const signIn = type.toLowerCase() === 'signin';

  return (
    <div className="mod-container shadow-lg py-10 px-5 rounded-2xl">
      <h1 className='text-3xl underline'>{signIn ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        signIn ? handeSignIn(e) : handleSignUp(e)
      }} className='pt-6 mb-2'>
        <div className="input-group">
          <label htmlFor="emailInput">Email address:</label>
          <input type="email" name="email" id="emailInput" placeholder='email@example.com' required value={email} onChange={({target}) => setEmail(target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput">Password:</label>
          <input className='' autoComplete="false" type="password" name="password" id="passwordInput" placeholder='Type in a password...' required value={password} onChange={({target}) => setPassword(target.value.trim())}/>
        </div>
        {!signIn && (
          <>
            <div className="input-group">
              <label htmlFor="confirmPasswordInput">Confirm Password:</label>
              <input autoComplete="false" type="password" name="" id="confirmPasswordInput" placeholder='Confirm the password...' required value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value.trim())}/>
            </div>
          </>
        )}
        <button className="btn dark-bg text-gray-50">{signIn ? 'Sign In' : 'Sign Up'}</button>
      </form>
      <button
        onClick={() => history.push(`/auth/${signIn ? 'signup' : 'signin'}`)}
        className="btn"
      >
        I meant {signIn ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  ); 
}

export default Auth;
