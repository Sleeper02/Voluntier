import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Perfil = "VOLUNTARIO" | "INSTITUICAO";

interface Usuario {
  id: string;
  nome: string;
  perfil: "VOLUNTARIO" | "INSTITUICAO";
  token: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  function login(usuarioData: Usuario) {
  localStorage.setItem(
    "usuario",
    JSON.stringify(usuarioData),
  );

  setUsuario(usuarioData);
}

  function logout() {
    localStorage.removeItem("usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}