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
  usuarioADM?: boolean;
  postDenunciado: boolean;
  blockDenuncia: number;
}

const RequestPost = async (): Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>("post");

  return response.data;
};

export const useRequestPost = (): UseQueryResult<PostData[], AxiosError> => {
  return useQuery("post", RequestPost, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 20000,
  });
};
