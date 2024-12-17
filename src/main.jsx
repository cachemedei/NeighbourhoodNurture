import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';

import Nav from './components/Nav';
import Activity from './components/Activity';
import EditProfile from './components/EditProfile';
import EditProject from './components/EditProject';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import Account from './pages/Account';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Nav />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                path: '/account',
                element: <Account />,
                children: [
                    { path: '/account', element: <Activity /> },
                    { path: '/account/editprofile', element: <EditProfile /> },
                    {
                        path: '/account/editproject/:id',
                        element: <EditProject />,
                    },
                ],
            },
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
