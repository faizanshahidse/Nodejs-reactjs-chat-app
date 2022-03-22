import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Component from './Route';

const Login = lazy(() => import('../pages/Login'));
const Chat = lazy(() => import('../pages/Chat'));

const RoutesComp = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route
        path='/login'
        exact
        element={<Component component={Login} path='/login' />}
      />
      <Route
        path='/chat'
        exact
        element={<Component component={Chat} path='/chat' isPrivate />}
      />
    </Routes>
  </Suspense>
);
export default RoutesComp;
