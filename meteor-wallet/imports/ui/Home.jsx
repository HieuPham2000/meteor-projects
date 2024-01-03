import React from 'react';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { useLoggedUser } from 'meteor/quave:logged-user-react';

import { Wallet } from './Wallet';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Loading } from './components/Loading';

import { RoutePaths } from './RoutePaths';

export const Home = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  if (isLoadingLoggedUser) {
    return <Loading />;
  }

  if (!loggedUser) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="px-3 py-2 text-lg text-base font-medium">Welcome!</h3>
        <div>
          Please{' '}
          <a
            className="cursor-pointer text-indigo-800 hover:text-indigo-600"
            onClick={() => navigate(RoutePaths.ACCESS)}
          >
            sign-in
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      <Wallet />
      <ContactForm />
      <ContactList />
    </>
  );
};
