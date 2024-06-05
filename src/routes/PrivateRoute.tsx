import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (!user.email) {
    sessionStorage.setItem("redirectAfterLogin", pathname);

    return <Navigate to="/auth/#login" replace={true} />;
  }

  return children;
}
