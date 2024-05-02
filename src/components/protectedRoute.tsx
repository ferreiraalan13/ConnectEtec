import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: any;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  user,
}) => {
  //console.log(user);
  return user ? <>{children}</> : <Navigate to="/" />;
};
