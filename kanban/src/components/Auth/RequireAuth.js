import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ roles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
         auth?.roles?.find(role => roles?.includes(role))
             ? <Outlet />
             : auth?.user
            //  unauthorized not working yet
                 ? <Navigate to="/unauthorized" state={{ from: location }} replace /> //state={{ from: location }} take u back to where u were before
                 : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;