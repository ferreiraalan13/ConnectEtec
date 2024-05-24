import { UseQueryResult, useQuery } from "react-query";
import { configApi } from "../configApi";
import { AxiosError } from "axios";

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

const RequestPost = async ():Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>(
    "perfilUsuario/buscarMeusPosts"
  );

  return response.data;
};

export const useRequestPost = (): UseQueryResult<PostData[], AxiosError> => {
  return useQuery("post", RequestPost, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
