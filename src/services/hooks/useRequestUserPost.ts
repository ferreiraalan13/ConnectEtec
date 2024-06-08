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

const RequestUserPosts = async (loginAutor: string): Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>(
    `perfilUsuario/buscarPosts?loginUsuario=${loginAutor}`
  );

  return response.data;
};

export const useRequestUserPosts = (loginAutor: string): UseQueryResult<PostData[], AxiosError> => {
  return useQuery(["UserPosts", loginAutor], () => RequestUserPosts(loginAutor), {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};
