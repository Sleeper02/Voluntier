import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  perfil?: "VOLUNTARIO" | "INSTITUICAO";
}

function PrivateRoute({ children, perfil }: PrivateRouteProps) {
  const { usuario } = useAuth();

  // não logado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // perfil errado
  if (perfil && usuario.perfil !== perfil) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PrivateRoute;
