import {
  CirclePlus,
  PartyPopper,
  LogOut,
  Settings,
  Users,
  ArrowLeft,
  Home,
  PocketKnife,
  Search,
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import userImage from "../assets/img/1702865313114.jpeg";
import { AuthContext } from "../Contexts/Auth/AuthContext";

export default function Menu() {
  const auth = useContext(AuthContext);

  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  };

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-gray-100 h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <ArrowLeft
        className={`bg-white text-purple-950 rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      <div className="inline-flex">
        <PocketKnife className="text-4xl cursor-pointer block float-left" />
        <h1
          className={`text-black origin-left font-medium text-2xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          ConnectEtec
        </h1>
      </div>

      <div
        className={`flex items-center rounded-md bg-gray-700 mt-6 ${
          !open ? "px-2.5" : "px-4"
        } py-2`}
      >
        <Search
          className={`text-white text-lg float-left cursor-pointer ${
            open && "mr-2"
          } `}
        />
        <input
          type="search"
          placeholder="Pesquisar"
          className={`text-base text-white bg-transparent w-full focus:outline-none ${
            !open && "hidden"
          }`}
        />
      </div>

      <ul className="pt-2">
        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/home")}
        >
          <span>
            <Home />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Inicio
          </span>
        </li>

        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/criarpublicacao")}
        >
          <span>
            <CirclePlus />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Criar Publicação
          </span>
        </li>

        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <Users />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Amigos
          </span>
        </li>

        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <PartyPopper />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Eventos
          </span>
        </li>

        <li className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2">
          <span>
            <Settings />
          </span>
          <span
            onClick={() => navigate("/editarPerfil")}
            className={`text-base font-medium flex-1 ${!open && "hidden"}`}
          >
            Configuração
          </span>
        </li>

        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => navigate("/homeperfil")}
        >
          <span>
            <img
              className="w-[26px] rounded-full bg-gray-300"
              src={userImage}
              alt=""
            />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Perfil
          </span>
        </li>

        <li
          className="text-Black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md mt-2"
          onClick={() => handleLogout()}
        >
          <span>
            <LogOut />
          </span>
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
            Sair
          </span>
        </li>
      </ul>
    </div>
  );
}
