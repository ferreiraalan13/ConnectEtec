import image from "../../assets/signup-image.svg";
import background from "../../assets/Background.svg";
import line from "../../assets/Line.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { Input } from "@chakra-ui/react";

interface FormData {
  nomeCompleto: string;
  nomeSocial?: string;
  login: string;
  curso?: string;
  senha: string;
  tipoUsuario: string;
}

export default function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    login: "",
    senha: "",
    nomeCompleto: "",
    nomeSocial: "",
    curso: "",
    tipoUsuario: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Criando uma cópia dos dados do formulário
      const formDataToSend = { ...formData };

      // Verificando se os campos curso e nomeSocial estão vazios e atribuindo null se forem
      if (formDataToSend.curso === "") {
        formDataToSend.curso = null as unknown as string | undefined;
      }
      if (formDataToSend.nomeSocial === "") {
        formDataToSend.nomeSocial = null as unknown as string | undefined;
      }
      const response = await axios.post(
        "http://localhost:8080/usuario/salvar",
        formDataToSend
      );
      console.log("Cadastro realizado com sucesso!", response.data);
      alert("Cadastro realizado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <img
        src={background}
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className="w-4/5 h-4/5 flex bg-gray-100 rounded-md shadow-lg z-10 overflow-auto md:max-w-4xl md:h-auto">
        <div className="hidden md:block md:w-2/5 lg:w-1/3">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-16 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-medium text-gray-800">Cadastro</h1>
            <img src={line} alt="decorative" />
          </div>

          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Nome Completo"
                type="text"
                name="nomeCompleto"
                required
                value={formData.nomeCompleto}
                onChange={(e) =>
                  setFormData({ ...formData, nomeCompleto: e.target.value })
                }
              />
              <Input
                placeholder="Nome Social"
                type="text"
                id="nomeSocial"
                name="nomeSocial"
                value={formData.nomeSocial}
                onChange={(e) =>
                  setFormData({ ...formData, nomeSocial: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Email"
                type="email"
                name="login"
                required
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
              />
              <Input
                placeholder="Curso"
                type="text"
                name="curso"
                value={formData.curso}
                onChange={(e) =>
                  setFormData({ ...formData, curso: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Senha"
                type="password"
                name="senha"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
              />
              <Input placeholder="Confirme a senha" type="password" />
              <Input
                placeholder="tipo Usuario"
                type="text"
                name="tipoUsuario"
                value={formData.tipoUsuario}
                onChange={(e) =>
                  setFormData({ ...formData, tipoUsuario: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-3 h-3 rounded-full flex relative">
                  <input type="checkbox" className="" />
                </div>
                Aceito os termos de uso
              </label>
              <a href="/terms" className="text-blue-500 hover:underline">
                Ler termos de uso
              </a>
            </div>

            <button
              type="submit"
              className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
            >
              Cadastre-se
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
