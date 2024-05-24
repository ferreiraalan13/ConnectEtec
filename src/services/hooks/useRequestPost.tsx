import { useQuery } from "react-query";
import { configApi } from "../configApi";


export interface PostData {
  idPost: string;
  nomeAutor?: string;
  urlFotoPerfilUsuario?: string;
  nomeGrupo?: string;
  urlFotoPerfilGrupo?: string;
  urlMidia?: string;
  momentoPublicacao?: string;
  conteudo?: string;
  qtdLike?: string;
  tag?: string;
}

const RequestPost = async () => {
  const response = await configApi.get<PostData[]>("perfilUsuario/buscarMeusPosts");
  
  return response.data;
};



export const useRequestPost = () => {
  
 
  
  return useQuery('profile', RequestPost, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
