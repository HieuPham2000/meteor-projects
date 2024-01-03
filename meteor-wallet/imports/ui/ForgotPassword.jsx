import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { ErrorAlert } from './components/ErrorAlert';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const forgotPassword = () => {
    Accounts.forgotPassword(
      {
        email,
      },
      (err) => {
        if (err) {
          console.error('Error requesting the link to create a new password: ', err);
          setError(err);
          return;
        }
        setError(null);
        setEmail('');
        alert('You should receive a reset email shortly!');
      },
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">Forgot Password</h3>
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
        </div>
        <div className="flex justify-center py-3">
          <button
            type="button"
            onClick={() => navigate(RoutePaths.ACCESS)}
            className="inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Back to Access
          </button>
          <button
            type="button"
            onClick={forgotPassword}
            className="ml-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};
