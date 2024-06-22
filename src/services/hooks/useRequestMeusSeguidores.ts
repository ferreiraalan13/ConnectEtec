import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
    nomePerfilUsuario?: string;
    urlFotoPerfil?: string | null;
    login?: string;
    estaSeguido?: boolean;

}

const RequestMeusSeguidores = async () => {
    const response = await configApi.get<PerfilData[]>(`perfilUsuario/meusSeguidores`);
    return response.data;
};

export const useRequestMeusSeguidores = () => {
    return useQuery(['RequestMeusSeguidores12'], () => RequestMeusSeguidores(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};

