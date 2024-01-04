import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { ErrorAlert } from './components/ErrorAlert';

export const Access = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    Accounts.createUser(
      {
        email,
        password,
      },
      (err) => {
        if (err) {
          console.error('Error signing up: ', err);
          setError(err);
          return;
        }
        setError(null);
        navigate(RoutePaths.HOME);
      },
    );
  };

  const signIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.error('Error signing in the user: ', err);
        setError(err);
        return;
      }
      setError(null);
      navigate(RoutePaths.HOME);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
      <form className="flex flex-col mt-6">
        {error && <ErrorAlert message={error.reason || 'Unknown error.'} />}
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button
            type="button"
            onClick={() => navigate(RoutePaths.HOME)}
            className="inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Back to Home
          </button>
          {isSignUp && (
            <button
              type="submit"
              onClick={signUp}
              className="ml-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign up
            </button>
          )}
          {!isSignUp && (
            <button
              type="submit"
              onClick={signIn}
              className="ml-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Sign in
            </button>
          )}
        </div>
        <div className="flex justify-center py-3">
          <a className="cursor-pointer text-indigo-800 hover:text-indigo-600" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'If you already have an account, click here' : `If you don't have an account, click here`}
          </a>
        </div>
        <div className="flex justify-center py-3">
          <a
            className="cursor-pointer text-indigo-800 hover:text-indigo-600"
            onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}
          >
            Forgot Password?
          </a>
        </div>
        <div className="flex justify-center py-3">
          <a
            className="cursor-pointer text-indigo-800 hover:text-indigo-600"
            onClick={() => navigate(RoutePaths.ACCESS_OTHER)}
          >
            Sign in another way?
          </a>
        </div>
      </form>
    </div>
  );
};
