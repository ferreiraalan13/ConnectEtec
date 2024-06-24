import axios from "axios";

export const configApi = axios.create({baseURL:'https://connect-etec.onrender.com/'})

//export const configApi = axios.create({ baseURL: "http://localhost:8080/" });
