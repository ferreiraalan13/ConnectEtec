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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import userImage from "../assets/img/1702865313114.jpeg";
import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { Avatar } from "@chakra-ui/react";
//import { AuthContext } from "../Contexts/Auth/AuthContext";

export default function Menu() {
  //const auth = useContext(AuthContext);

  // const handleLogout = async () => {
  //   await auth.signout();
  //   navigate("/");
  // };

  const navigate = useNavigate();

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

      <div className={`flex items-center rounded-md bg-gray-700 mt-6 py-2`}>
        <Search className={`text-white text-lg float-left cursor-pointer `} />
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
              name="Alan Ferreira"
              w={"30px"}
              h={"30px"}
              rounded={"100%"}
              src="https://firebasestorage.googleapis.com/v0/b/connectetec-5d4be.appspot.com/o/imagens%2Fpublicacao%2F%201715554087355_CAM02170.jpg?alt=media&token=f49d011c-86f2-48f1-b89f-1cd6a38c3e01"
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
