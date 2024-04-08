import { Input } from '@chakra-ui/react'
import {
  CirclePlus,
  Home,
  LogOut,
  PartyPopper,
  Settings,
  Users,
} from 'lucide-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import userImage from '../assets/img/1702865313114.jpeg'
import imagem from '../assets/img/Frame 5.svg'
import { AuthContext } from '../Contexts/Auth/AuthContext'

export default function Menu() {
  const navigate = useNavigate()

  const auth = useContext(AuthContext)

  const handleLogout = async () => {
    await auth.signout()
    navigate('/')
  }

  return (
    <div className="bg-gray-100 flex flex-col w-[295px] p-[15px] gap-[100px] h-screen rounded-[16px] fixed">
      <div className="flex gap-2 w-full justify-center">
        <div>
          <img src={imagem} alt="" />
        </div>
      </div>
      <div className="flex flex-col w-full gap-[10px] ">
        <button
          className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"
          onClick={() => navigate('/home')}
        >
          {' '}
          <Home />
          Inicio
        </button>

        <Input placeholder="Basic usage"></Input>

        <button
          className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"
          onClick={() => navigate('/criarPublicacao')}
        >
          {' '}
          <CirclePlus /> Criar Publicação
        </button>
        <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg">
          {' '}
          <Users />
          Amigos
        </button>
        <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg">
          {' '}
          <PartyPopper />
          Eventos
        </button>
        <button className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg">
          {' '}
          <Settings />
          Configuracao
        </button>
        <button
          className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"
          onClick={() => navigate('/homeperfil')}
        >
          <img
            className="w-[26px] rounded-full bg-gray-300"
            src={userImage}
            alt=""
          />
          {auth.user?.name}
        </button>
        <button
          className="bg-gray-300 text-gray-700 flex gap-3 p-2 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut /> Sair
        </button>
      </div>
    </div>
  )
}
