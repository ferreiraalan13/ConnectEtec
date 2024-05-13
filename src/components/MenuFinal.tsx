import {
  CirclePlus,
  PartyPopper,
  LogOut,
  Settings,
  Users,
  Home,
  PocketKnife,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
//import { AuthContext } from "../Contexts/Auth/AuthContext";

interface PerfilData {
  nomeCompleto?: string;
  nomeSocial?: string;
  nomeUsuario?: string;
  urlFotoPerfil?: string;
  sobre?: string;
}

export default function Menu() {
  const navigate = useNavigate();

  const [perfilData, setPerfilData] = useState<PerfilData | null>(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("authToken")}`;

  useEffect(() => {
    axios
      .get("http://localhost:8080/perfilUsuario/buscarMeuPerfil")
      .then((response) => {
        setPerfilData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
      });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Limpar token de autenticação do localStorage
        localStorage.removeItem("authToken");
        console.log("Sign Out");
        navigate("/"); // ou qualquer outra rota que você queira redirecionar após o logout
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={`bg-gray-100 h-screen p-5 pt-8
         "w-72"
       relative`}
    >
      <div className="inline-flex">
        <PocketKnife className="text-4xl cursor-pointer block float-left" />
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

        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <Users />
          </span>
          <span className={`text-base font-medium flex-1 `}>Amigos</span>
        </li>

        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <PartyPopper />
          </span>
          <span className={`text-base font-medium flex-1`}>Eventos</span>
        </li>

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
              name={perfilData?.nomeCompleto}
              w={"30px"}
              h={"30px"}
              rounded={"100%"}
              src={perfilData?.urlFotoPerfil}
            ></Avatar>
            {/* <img
              className="w-[26px] rounded-full bg-gray-300"
              src={userImage}
              alt=""
            /> */}
          </span>
          <span className={`text-base font-medium flex-1 `}>Perfil</span>
        </li>

        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={handleSignOut}
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
