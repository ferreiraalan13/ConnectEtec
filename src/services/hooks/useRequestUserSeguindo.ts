import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
    nomePerfilUsuario?: string;
    urlFotoPerfil?: string | null;
    login?: string;
    estaSeguido?: boolean;

}

const RequestUserSeguindo = async (loginAutor: string) => {
    const response = await configApi.get<PerfilData[]>(`perfilUsuario/usuariosSeguidos?loginUsuario=${loginAutor}`);
    return response.data;
};

export const useRequestUserSeguindo = (loginAutor: string) => {
    return useQuery(['RequestUsersSeguindo', loginAutor], () => RequestUserSeguindo(loginAutor), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};

