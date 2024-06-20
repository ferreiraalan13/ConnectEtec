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
  postCurtido: boolean;
  tag?: string;
  loginAutor?: string;
  qtdComentarios?: number;
}

const RequestTagPost = async (tag: string): Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>(
    `post/buscarPorTag?tag=${tag}`
  );

  return response.data;
};

export const useRequestTagPost = (tag: string): UseQueryResult<PostData[], AxiosError> => {
  return useQuery(["RequestTagPost", tag], () => RequestTagPost(tag), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
