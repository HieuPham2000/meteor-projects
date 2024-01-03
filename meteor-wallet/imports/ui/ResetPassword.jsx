import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { ErrorAlert } from './components/ErrorAlert';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const resetPassword = () => {
    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        console.error('Error trying to reset the password', err);
        setError(err);
        return;
      }
      setError(null);
      setPassword('');
      alert('Your new password is set, please sign in!');
      navigate(RoutePaths.ACCESS);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">Reset Password</h3>
      <form className="flex flex-col mt-6">
        {error && <ErrorAlert message={error.reason || 'Unknown error.'} />}
        <div className="flex flex-col space-y-2">
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

          <button
            type="button"
            onClick={resetPassword}
            className="ml-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Set New Password
          </button>
        </div>
      </form>
    </div>
  );
};
