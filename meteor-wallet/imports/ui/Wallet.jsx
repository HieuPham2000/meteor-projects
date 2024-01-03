import React, { useState } from 'react';

import { Meteor } from 'meteor/meteor';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
// @ts-ignore
import { useLoggedUser } from 'meteor/quave:logged-user-react';

import { ContactsCollection } from '/imports/api/collections/ContactsCollection';
import { WalletsCollection } from '/imports/api/collections/WalletsCollection';

import { Modal } from './components/Modal';
import { Loading } from './components/Loading';
import { SelectContact } from './components/SelectContact';

export const Wallet = () => {
  const { loggedUser } = useLoggedUser();
  const isLoadingWallets = useSubscribe('myWallet');
  const [wallet] = useFind(() => WalletsCollection.find());

  const isLoadingContacts = useSubscribe('myContacts');
  const contacts = useFind(() => ContactsCollection.find({}, { sort: { createdAt: -1 } }));

  const [open, setOpen] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [amount, setAmount] = useState(0);
  const [destinationContact, setDestinationContact] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const addTransaction = () => {
    Meteor.call(
      'transactions.insert',
      {
        isTransferring,
        sourceWalletId: wallet?._id,
        // @ts-ignore
        destinationContactId: destinationContact?._id,
        amount: Number(amount) || 0,
      },
      (errorResponse) => {
        if (errorResponse) {
          if (errorResponse.details && errorResponse.details.length) {
            setErrorMessage(errorResponse.details[0]?.message);
          } else {
            setErrorMessage(errorResponse.error);
          }
        } else {
          setOpen(false);
          setDestinationContact({});
          setAmount(0);
          setErrorMessage('');
        }
      },
    );
  };

  if (isLoadingContacts() || isLoadingWallets()) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex font-sans shadow-md my-10">
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <div className="w-full flex-none text-sm font-medium text-gray-500">Email:</div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">{loggedUser?.email}</h1>
            <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">Wallet ID:</div>
            <h1 className="flex-auto text-lg font-semibold text-gray-700">{wallet._id}</h1>
            <div className="text-2xl font-bold text-gray-700">{`${wallet.balance} ${wallet.currency}`}</div>
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <div className="flex-auto flex space-x-4 mt-4">
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(false);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Add money
              </button>
              <button
                type="button"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                onClick={() => {
                  setIsTransferring(true);
                  setErrorMessage('');
                  setOpen(true);
                }}
              >
                Transfer money
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={isTransferring ? 'Transfer money to other wallet' : 'Add money to your wallet'}
        body={
          <>
            {isTransferring && (
              <div className="mt-2">
                <SelectContact
                  contact={destinationContact}
                  setContact={setDestinationContact}
                  contacts={contacts}
                  title="Destination Contact"
                />
              </div>
            )}
            <div className="mt-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                min={0}
                placeholder="0.00"
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </>
        }
        footer={
          <>
            <button
              type="button"
              className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={addTransaction}
            >
              {isTransferring ? 'Transfer' : 'Add'}
            </button>
          </>
        }
        errorMessage={errorMessage}
      />
    </>
  );
};
