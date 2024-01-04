import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loading } from './Loading';
import { RoutePaths } from '../RoutePaths';

export const AdminOnly = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    Meteor.call('roles.isAdmin', (err, isAdminReturn) => {
      if (err) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(isAdminReturn);
    });
  }, []);
  const location = useLocation();

  if (isAdmin == null) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Navigate to={RoutePaths.HOME} state={{ from: location }} replace />;
  }
  return children;
};
