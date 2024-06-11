import image from "../../assets/signup-image.svg";
import background from "../../assets/Background.svg";
import line from "../../assets/Line.svg";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";

import {
  Input,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";

import Termos from "./TermosDeUso";
import { configApi } from "../../services/configApi";

interface FormData {
  nomeCompleto: string;
  nomeSocial?: string | null;
  login: string;
  senha: string;
  tipoUsuario?: string;
  idRequest?: string;
  codigoDeValidacao?: number;
}

export default function App() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const [confirmSenha, setConfirmSenha] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    login: "",
    senha: "",
    nomeCompleto: "",
    nomeSocial: "",
    tipoUsuario: "",
    idRequest: "",
    codigoDeValidacao: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const formDataToSend = { ...formData };

      if (formData.senha !== confirmSenha) {
        console.error("As senhas não coincidem");
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      if (formData.login !== confirmEmail) {
        console.error("Os emails não coincidem");
        toast({
          title: "Erro",
          description: "Os emails não coincidem",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      if (formDataToSend.nomeSocial === "") {
        formDataToSend.nomeSocial = null;
      }

      if (formDataToSend.tipoUsuario === "") {
        formDataToSend.tipoUsuario = "USUARIO";
      }
      if (formDataToSend.tipoUsuario === "ADMINISTRADOR") {
        toast({
          title: "Erro",
          description: "Não é possivel cadastrar como ADMINISTRADOR",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
        return;
      }

      await configApi
        .post("usuario/emailValidacao", { login: formDataToSend.login })
        .then((response) => {
          toast({
            title: "Sucesso",
            description: "Siga o proximo passo",
            status: "success",
            duration: 1000,
            isClosable: true,
          });

          formDataToSend.idRequest = response.data;

          navigate("/cadastro-confirmacao", { state: formDataToSend });
        })
        .catch(() => {})
        .finally(() => {
          setIsSubmitting(false);
        });
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
                placeholder="Nome Social (Opcional)"
                type="text"
                id="nomeSocial"
                name="nomeSocial"
                value={formData.nomeSocial || ""}
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
                placeholder="Confirme o Email"
                type="email"
                name="login"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
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
              <Input
                placeholder="Confirme a senha"
                type="password"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                required
              />

              <Select
                placeholder="Tipo de usuario"
                disabled
                onChange={(e) =>
                  setFormData({ ...formData, tipoUsuario: e.target.value })
                }
              >
                <option value="USUARIO">Usuario</option>
                <option value="ADMINISTRADOR">Administrador</option>
              </Select>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <Checkbox required>Aceito termos de uso</Checkbox>

              <Button mt={3} onClick={onOpen}>
                Ler termos de uso
              </Button>

              <Modal
                onClose={onClose}
                isOpen={isOpen}
                scrollBehavior={"inside"}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Termos de Uso</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Termos />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>

            {isSubmitting ? (
              <Button className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md">
                <Spinner />
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-4 transition bg-gray-300 hover:bg-gray-500 hover:text-gray-100 font-bold py-1 px-2 rounded-2xl drop-shadow-md"
              >
                Cadastre-se
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
