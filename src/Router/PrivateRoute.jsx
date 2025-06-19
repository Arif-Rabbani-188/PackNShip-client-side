import React, { use } from 'react';
import { Authconext } from '../Context/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const location = useLocation();

    const {user} = use(Authconext);

    if (!user) {
        return <Navigate to="/login" state={location.pathname} replace={true} />
    }
    return (
        children
    );
};

export default PrivateRoute;