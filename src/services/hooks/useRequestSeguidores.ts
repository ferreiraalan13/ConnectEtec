import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
    nomePerfilUsuario?: string;
    urlFotoPerfil?: string | null;
    login?: string;
    estaSeguido?: boolean;

}

const RequestSeguidores = async (loginAutor: string) => {
    const response = await configApi.get<PerfilData[]>(`perfilUsuario/seguidores?loginUsuario=${loginAutor}`);
    return response.data;
};

export const useRequestSeguidores = (loginAutor: string) => {
    return useQuery(['RequestSeguidores', loginAutor], () => RequestSeguidores(loginAutor), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};

