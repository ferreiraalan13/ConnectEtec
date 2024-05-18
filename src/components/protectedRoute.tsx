import { useContext } from "react";
import { ContextAuth } from "../contexts/Authentication";

interface ProtectedRouteProps {
  authenticatedRoute: JSX.Element;
  noAuthRoute: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authenticatedRoute,
  noAuthRoute,
}) => {
  const { isAuth } = useContext(ContextAuth);
  if (isAuth === undefined) {
    return null;
  }
  return isAuth ? authenticatedRoute : noAuthRoute;
};
