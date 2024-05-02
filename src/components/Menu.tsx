import {
  CirclePlus,
  PartyPopper,
  LogOut,
  Settings,
  Users,
  Home,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import userImage from "../assets/img/1702865313114.jpeg";
//import { AuthContext } from "../Contexts/Auth/AuthContext";

export default function MenuFinal() {
  //const auth = useContext(AuthContext);

  const handleLogout = async () => {
    //await auth.signout();
    navigate("/");
  };

  const [open] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-gray-100 h-screen p-5 pt-8 ${
        open ? "w-full" : "w-20"
      } duration-300 relative`}
    >
      <div className="inline-flex">
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
        {/*<input
          type="search"
          placeholder="Pesquisar"
          className={`text-base text-white bg-transparent w-full focus:outline-none ${
            !open && "hidden"
          }`}
        />*/}
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
          <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>
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
