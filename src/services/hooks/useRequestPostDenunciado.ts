import { UseQueryResult, useQuery } from "react-query";
import { configApi } from "../configApi";
import { AxiosError } from "axios";

export interface PostDenunciadoData {
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
  qtdDenuncia: number;
}

const RequestPostDenunciado = async (): Promise<PostDenunciadoData[]> => {
  const response = await configApi.get<PostDenunciadoData[]>(
    "post/listarDenuncias"
  );

  return response.data;
};

export const useRequestPostDenunciado = (): UseQueryResult<
  PostDenunciadoData[],
  AxiosError
> => {
  return useQuery("postDenunciado", RequestPostDenunciado, {
    refetchOnWindowFocus: false,
  });
};
