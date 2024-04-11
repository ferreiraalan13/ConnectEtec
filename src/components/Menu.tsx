import { Input } from "@chakra-ui/react";
import {
  CirclePlus,
  Home,
  LogOut,
  PartyPopper,
  Settings,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import userImage from "../assets/img/1702865313114.jpeg";
import imagem from "../assets/img/Frame 5.svg";
import { AuthContext } from "../Contexts/Auth/AuthContext";
import ItensMenu from "./ItensMenu";

export default function Menu() {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  };

  return (
    <div className="bg-gray-100 flex flex-col w-[] p-[15px] gap-[100px] h-screen rounded-[10px] fixed mt-3">
      <div className="flex gap-2 w-full justify-center">
        <div>
          <img src={imagem} alt="" />
        </div>
      </div>
      <div className="flex flex-col w-full gap-[10px] ">
        <ItensMenu label="Inicio" route="/home">
          {" "}
          <Home />{" "}
        </ItensMenu>

        <ItensMenu label="Criar Publicacao" route="/criarPublicacao">
          {" "}
          <CirclePlus />{" "}
        </ItensMenu>
        <ItensMenu label="Amigos">
          <Users />
        </ItensMenu>
        <ItensMenu label="Eventos">
          {" "}
          <PartyPopper />{" "}
        </ItensMenu>
        <ItensMenu label="Configuracao">
          {" "}
          <Settings />{" "}
        </ItensMenu>
        <ItensMenu label="Perfil" route="/homeperfil">
          {" "}
          <img
            className="w-[26px] rounded-full bg-gray-300"
            src={userImage}
            alt=""
          />
        </ItensMenu>
        <ItensMenu label="Sair" customFunction={handleLogout}>
          {" "}
          <LogOut />
        </ItensMenu>
      </div>
    </div>
  );
}
