import image from "./formando-a-ilustracao-do-conceito-de-lideranca-de-equipe_114360-10883 1 (1).svg";
import background from "../../assets/Background.svg";

import InputTemplate from "../../components/InputTemplate";
import { useNavigate } from "react-router-dom";

import { Text, Link, Checkbox } from "@chakra-ui/react";
import React from "react";

export default function Login() {
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <img
        src={background}
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className="w-4/5 h-4/5 flex bg-gray-100 rounded-md shadow-lg z-10 overflow-auto md:max-w-4xl md:h-auto">
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-16 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-medium text-gray-800">Login</h1>
            <h1 className="flex justify-center text-2xl font-medium text-gray-800">
              Boas vindas!
            </h1>
          </div>

          <form action="" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputTemplate labelTitle="Email" type="email" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputTemplate labelTitle="Senha" type="password" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <Checkbox defaultChecked>Lembrar de mim</Checkbox>
              <Link color="teal.500" href="#">
                {" "}
                Esqueceu sua senha?{" "}
              </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <Text>
                Não tem uma conta? {" "}
                <Link color="teal.500" href="/signUp">
                  Cadastre-se
                </Link>
              </Text>
            </div>

            <button
              type="submit"
              className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
              onClick={() => navigate("/home")}
            >
              Login
            </button>
          </form>
        </div>
        <div className="hidden md:block md:w-2/5 lg:w-1/3">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>
      </div>
    </div>
  );
}