import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';

export const AccessOther = () => {
  const navigate = useNavigate();

  const onEnterToken = () => {
    navigate('/');
  };

  return <Passwordless onEnterToken={onEnterToken} />;
};
