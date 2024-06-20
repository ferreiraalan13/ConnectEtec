import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
    nomeCompleto?: string;
    nomeSocial?: string;
    nomeUsuario?: string;
    urlFotoPerfil?: string;
    sobre?: string;
    loginAutor?: string;
    qtdUsuariosSeguidos?: number;
    qtdSeguidores?: number;
    estaSeguido?: boolean;

}

const RequestUserProfile = async (loginAutor: string): Promise<PerfilData> => {
    const response = await configApi.get<PerfilData>(`perfilUsuario/buscarPerfil?loginUsuario=${loginAutor}`);
    return response.data;
};

export const useRequestUserProfile = (loginAutor: string) => {
    return useQuery(['UserProfile', loginAutor], () => RequestUserProfile(loginAutor), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};