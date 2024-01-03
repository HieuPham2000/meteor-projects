import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { SignUp } from './SignUp';

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.SIGN_UP} element={<SignUp />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
