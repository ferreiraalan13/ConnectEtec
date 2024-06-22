import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "./formando-a-ilustracao-do-conceito-de-lideranca-de-equipe_114360-10883 1 (1).svg";

import { ContextAuth } from "../../contexts/Authentication";

interface FormData {
  login: string;
  senha: string;
}

export default function Login() {
  const toast = useToast();

  const navigate = useNavigate();

  const { signIn } = useContext(ContextAuth);

  const [formData, setFormData] = useState<FormData>({
    login: "",
    senha: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData.login, formData.senha).catch(() => {
      toast({
        title: "Erro ao logar",
        description: "Verifique seu email e senha",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  return (
    <Box
      bg="#ff7461"
      className="w-screen h-screen flex items-center justify-center overflow-hidden "
    >
      {/* <img
        src={background}
        alt=""
        className="absolute w-full h-full object-cover"
      /> */}
      <div className="w-4/5 h-4/5 flex bg-gray-100 rounded-md shadow-lg z-10 overflow-auto md:max-w-4xl md:h-auto">
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-16 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-medium text-gray-800">Login</h1>
            <h1 className="flex justify-center text-2xl font-medium text-gray-800">
              Boas vindas!
            </h1>
          </div>

          <form
            onSubmit={handleLogin}
            action=""
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <InputTemplate labelTitle="Email" type="email" /> */}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={formData.login}
                  onChange={(e) =>
                    setFormData({ ...formData, login: e.target.value })
                  }
                  placeholder="Digite seu email"
                />
              </FormControl>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <InputTemplate labelTitle="Senha" type="password" /> */}
              <FormControl>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  value={formData.senha}
                  onChange={(e) =>
                    setFormData({ ...formData, senha: e.target.value })
                  }
                  placeholder="Digite sua senha"
                />
              </FormControl>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <Button
                onClick={() => navigate("/resetar-senha")}
                color="teal.500"
                bg="transparent"
              >
                {" "}
                Esqueceu sua senha?{" "}
              </Button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <Text>
                Não tem uma conta?{" "}
                <Button
                  color="teal.500"
                  bg={"transparent"}
                  onClick={() => navigate("/signup")}
                >
                  Cadastre-se
                </Button>
              </Text>
            </div>

            <button
              type="submit"
              className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
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
    </Box>
  );
}
