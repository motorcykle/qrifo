import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Auth = () => {
  const { type } = useParams();
  const history = useHistory();

  if (!['signin', 'signup'].includes(type.toLowerCase())) history.push('/'); 

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const signIn = type.toLowerCase() === 'signin';

  return (
    <div className="mod-container shadow-lg py-14 rounded-2xl">
      <h1 className='text-3xl underline'>{signIn ? 'Sign In' : 'Sign Up'}</h1>
      <form className='pt-6 mb-2'>
        <div className="input-group">
          <label htmlFor="emailInput">Email address:</label>
          <input type="email" name="email" id="emailInput" placeholder='email@example.com' required/>
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput">Password:</label>
          <input className='' autoComplete={false} type="password" name="password" id="passwordInput" placeholder='Type in a password...' required/>
        </div>
        {!signIn && (
          <div className="input-group">
            <label htmlFor="confirmPasswordInput">Confirm Password:</label>
            <input autoComplete={false} type="password" name="" id="confirmPasswordInput" placeholder='Confirm the password...' required/>
          </div>
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
