import { useMutation } from "react-query";
import { configApi } from "../configApi";



const TornarAdmin = async (login: string) => {
  const response = await configApi.patch(
    "usuario/alterarTipoUsuario",{
      login: login
    }
  );

  return response.data;
};

export const useTornarAdmin = () => {
  return useMutation("tornar_admin", (login: string)=> TornarAdmin(login) );
};
