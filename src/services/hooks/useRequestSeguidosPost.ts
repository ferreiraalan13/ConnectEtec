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
  loginAutor?: string,
  qtdComentarios?: number,
  usuarioADM?: boolean,

}

const RequestSeguidosPost = async ():Promise<PostData[]> => {
  const response = await configApi.get<PostData[]>(
    "/post/postsUsuariosSeguidos"
  );

  return response.data;
};

export const useRequestSeguidosPost = (): UseQueryResult<PostData[], AxiosError> => {
  return useQuery("post", RequestSeguidosPost, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
