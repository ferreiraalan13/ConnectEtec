import { useQuery } from "react-query";
import { configApi } from "../configApi";

export interface PerfilData {
  nomePerfilUsuario?: string;
  urlFotoPerfil?: string;
  login?: string;
  estaSeguido?: boolean;
}

const RequestSearchUser = async (nome: string) => {
  const response = await configApi.get<PerfilData[]>(`perfilUsuario/buscarPorNome?nome=${nome}`);
  return response.data;
};

export const useRequestSearchUser = (nome: string) => {
  return useQuery(['SearchByName', nome], () => RequestSearchUser(nome), {
    enabled: !!nome, // Só habilita a consulta se 'nome' não for vazio
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
