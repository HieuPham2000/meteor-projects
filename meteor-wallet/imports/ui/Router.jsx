import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { Access } from './Access';

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.ACCESS} element={<Access />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
