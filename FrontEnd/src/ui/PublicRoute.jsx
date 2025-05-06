/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

function PublicRoute({ children }) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isPending) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate, isPending]);

  if (isPending) return <Spinner />;

  return !isAuthenticated ? children : null;
}

export default PublicRoute;
