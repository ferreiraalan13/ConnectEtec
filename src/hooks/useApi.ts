// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://localhost:8080/',
// })

// export const useApi = () => ({
//   validateToken: async (token: string) => {
//     return {
//       user: { id: 3, name: 'jose', email: 'jose@gmail.com' },
//     }
//     const response = await api.post('/validate', { token })
//     return response.data
//   },
//   signin: async (login: string, senha: string) => {
    
//     const response = await api.post('usuario/login', { login, senha })
//     console.log(response.data)
//     return response.data
//     return {
//       user: { id: 3, name: 'jose', email: 'jose@gmail.com' },
//       token: '123456789',
//     }
//   },
//   logout: async () => {
//     return { status: true }
//     const response = await api.post('/logout')
//     return response.data
//   },
// })
