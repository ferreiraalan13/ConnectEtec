import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
    nomePerfilUsuario?: string;
    urlFotoPerfil?: string | null;
    login?: string;
    estaSeguido?: boolean;

}

const RequestMeusSeguindo = async () => {
    const response = await configApi.get<PerfilData[]>(`perfilUsuario/meusUsuariosSeguidos`);
    return response.data;
};

export const useRequestMeusSeguindo = () => {
    return useQuery(['RequestMeusSeguindo'], () => RequestMeusSeguindo(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};

