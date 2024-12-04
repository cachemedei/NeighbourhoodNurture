import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Project from './pages/Project';
import NewProject from './pages/NewProject';

import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './components/AuthProvider';
import Account from './pages/Account';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Nav />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            { path: '/account', element: <Account /> },
            { path: '/newproject', element: <NewProject /> },
            { path: '/project/:id', element: <Project /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
