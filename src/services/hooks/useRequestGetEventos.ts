
import { useQuery } from "react-query"
import { configApi } from "../configApi";

export interface IResponseProps{
    urlMidia: string
}

const RequestGetEventos = async() => {
    const response = await configApi.get<IResponseProps[]>("evento")
    return response.data
}

export const useRequestGetEventos = () => {
    return useQuery(['getEventos'], RequestGetEventos, {refetchOnWindowFocus: false, refetchOnMount: true} )
}