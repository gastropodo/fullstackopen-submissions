import { Navigate, Outlet } from 'react-router-dom';
import { useUserValue } from '../contexts/authContext';

const ProtectedRoute = () => {
    const user = useUserValue();

    if (user) return <Outlet />;
    return <Navigate replace to='/login' />;
};

export default ProtectedRoute;
