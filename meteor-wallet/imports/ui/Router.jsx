import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Access } from './Access';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { AdminOnly } from './components/AdminOnly';
import { LoggedUserOnly } from './components/LoggedUserOnly';
import { AnonymousOnly } from './components/AnonymousOnly';
import { RemoveTransaction } from './RemoveTransaction';
import { AccessOther } from './AccessOther';

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <LoggedUserOnly>
          <Home />
        </LoggedUserOnly>
      }
    />
    <Route
      path={RoutePaths.ACCESS}
      element={
        <AnonymousOnly>
          <Access />
        </AnonymousOnly>
      }
    />
    <Route
      path={RoutePaths.ACCESS_OTHER}
      element={
        <AnonymousOnly>
          <AccessOther />
        </AnonymousOnly>
      }
    />
    <Route
      path={RoutePaths.FORGOT_PASSWORD}
      element={
        <AnonymousOnly>
          <ForgotPassword />
        </AnonymousOnly>
      }
    />
    <Route
      path={`${RoutePaths.RESET_PASSWORD}/:token`}
      element={
        <AnonymousOnly>
          <ResetPassword />
        </AnonymousOnly>
      }
    />
    <Route
      path={RoutePaths.REMOVE_TRANSACTION}
      element={
        <AdminOnly>
          <RemoveTransaction />
        </AdminOnly>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
