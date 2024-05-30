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
  conteudo?: string;
  qtdLike?: string;
  momento?: string;
  postCurtido?: boolean;
  tag?: string;
}

const RequestMeusPosts = async ():Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>(
    "perfilUsuario/buscarMeusPosts"
  );

  return response.data;
};

export const useRequestMeusPosts = (): UseQueryResult<PostData[], AxiosError> => {
  return useQuery("MeusPosts", RequestMeusPosts, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
