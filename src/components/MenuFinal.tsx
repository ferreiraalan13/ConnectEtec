import {
  CirclePlus,
  LogOut,
  Settings,
  Home,
  UsersRound,
  Search,
  PartyPopper,
  Megaphone,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Avatar, useMediaQuery } from "@chakra-ui/react";
import { useRequestProfile } from "../services/hooks/useRequestProfile";
import { useContext } from "react";
import { ContextAuth } from "../contexts/Authentication";
export default function Menu() {
  const navigate = useNavigate();
  const { signOut } = useContext(ContextAuth);
  const { data } = useRequestProfile();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <div
      style={{ minWidth: "220px" }}
      className={`bg-gray-100 h-screen p-5 pt-8
         "w-72"
       relative`}
    >
      <div className="inline-flex">
        <h1
          className={`text-black origin-left font-medium text-2xl duration-300 
          `}
        >
          ConnectEtec
        </h1>
      </div>
      <ul className="pt-2">
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/home")}
        >
          <span>
            <Home />
          </span>
          <span className={`text-base font-medium flex-1 `}>Inicio</span>
        </li>
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/criarpublicacao")}
        >
          <span>
            <CirclePlus />
          </span>
          <span className={`text-base font-medium flex-1 `}>
            Criar Publicação
          </span>
        </li>
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/buscar-perfil")}
        >
          <span>
            <UsersRound />
          </span>
          <span className={`text-base font-medium flex-1 `}>Buscar Perfil</span>
        </li>

        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/filtrar-postagem")}
        >
          <span>
            <Search />
          </span>
          <span className={`text-base font-medium flex-1 `}>Filtrar Posts</span>
        </li>
        {data?.usuarioADM && (
          <li
            className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
            onClick={() => navigate("/post-denunciados")}
          >
            <span>
              <Megaphone />
            </span>
            <span className={`text-base font-medium flex-1 `}>
              Posts denunciados
            </span>
          </li>
        )}
        {data?.usuarioADM === true && (
          <li
            className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
            onClick={() => navigate("/eventos")}
          >
            <span>
              <PartyPopper />
            </span>
            <span className={`text-base font-medium flex-1 `}>
              Criar Eventos
            </span>
          </li>
        )}

        {isMobile && (
          <li
            className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
            onClick={() => navigate("/eventos-proximos")}
          >
            <span>
              <PartyPopper />
            </span>
            <span className={`text-base font-medium flex-1 `}>
              Eventos Próximos
            </span>
          </li>
        )}

        {/* 
        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <Users />
          </span>
          <span className={`text-base font-medium flex-1 `}>Amigos</span>
        </li> */}
        {/* <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <PartyPopper />
          </span>
          <span className={`text-base font-medium flex-1`}>Eventos</span>
        </li> */}
        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <Settings />
          </span>
          <span
            onClick={() => navigate("/editarPerfil")}
            className={`text-base font-medium flex-1 `}
          >
            Configuração
          </span>
        </li>
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/homeperfil")}
        >
          <span>
            <Avatar
              name={data?.nomeCompleto}
              w={"30px"}
              h={"30px"}
              rounded={"100%"}
              src={data?.urlFotoPerfil}
            ></Avatar>
          </span>
          <span className={`text-base font-medium flex-1 `}>Perfil</span>
        </li>
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={signOut}
        >
          <span>
            <LogOut />
          </span>
          <span className={`text-base font-medium flex-1 `}>Sair</span>
        </li>
      </ul>
    </div>
  );
}
