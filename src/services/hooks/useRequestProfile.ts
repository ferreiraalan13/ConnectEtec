
import { useQuery } from "react-query"
import { configApi } from "../configApi";

export interface PerfilData {
    nomeCompleto?: string;
    nomeSocial?: string;
    nomeUsuario?: string;
    urlFotoPerfil?: string;
    sobre?: string;
    qtdUsuariosSeguidos?: number;
    qtdSeguidores?: number;
    usuarioADM?: boolean;
  }

const RequestProfile = async() => {
    const response = await configApi.get<PerfilData>("perfilUsuario/buscarMeuPerfil")
    return response.data
}

export const useRequestProfile = () => {
    return useQuery(['profile'], RequestProfile, {refetchOnWindowFocus: false, refetchOnMount: true} )
}