import { createContext, useEffect, useState } from "react";
import { configApi } from "../services/configApi";

interface IAuth {
  signIn(login: string, senha: string): Promise<void>;
  signOut(): void;
  isAuth?: boolean;
}

export const ContextAuth = createContext({} as IAuth);

interface IOwnProps {
  children: React.ReactNode;
}

const ProviderAuth: React.FC<IOwnProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>();
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      localStorage.setItem("authToken", token);
      configApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const signIn = async (login: string, senha: string) => {
    await configApi
      .post("usuario/login", {
        login: login,
        senha: senha,
      })
      .then((response) => {
        localStorage.setItem("authToken", response.data);
        configApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("authToken")}`;

        setIsAuth(true);
      })
      .catch((error) => {
        throw error;
      });
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    configApi.defaults.headers.common["Authorization"] = "";
    setIsAuth(false);
  };

  return (
    <ContextAuth.Provider value={{ isAuth, signIn, signOut }}>
      {children}
    </ContextAuth.Provider>
  );
};

export default ProviderAuth;
