import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { ErrorAlert } from './components/ErrorAlert';

export const RemoveTransaction = () => {
  const navigate = useNavigate();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState(null);

  const removeTransaction = (e) => {
    e.preventDefault();
    Meteor.call('transactions.remove', transactionId,
      (err) => {
        if (err) {
          console.error('Error trying to remove a transaction: ', err);
          setError(err);
          return;
        }
        setError(null);
        setTransactionId('');
        alert('The transaction removed!');
      },
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg text-base font-medium">Remove Transaction</h3>
      <form className="flex flex-col mt-6">
        {error && <ErrorAlert message={error.reason || 'Unknown error.'} />}
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
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
            type="submit"
            onClick={removeTransaction}
            className="ml-4 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
