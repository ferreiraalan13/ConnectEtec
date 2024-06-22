import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FormEventHandler, useEffect, useState } from "react";
import { configApi } from "../../services/configApi";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  login?: string;
  senha?: string;
  numeroDeRecuperacao?: number;
  idRequest?: string;
}

const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const idRequest = useLocation().state as string;
  const [confirmSenha, setConfirmSenha] = useState<string>("");
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    login: "",
    senha: "",
    numeroDeRecuperacao: undefined,
    idRequest: idRequest,
  });
  const resetPassword: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (formData.senha !== confirmSenha) {
      console.error("As senhas não coincidem");
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    configApi
      .patch("usuario/mudarSenhaPorRequest", formData)
      .then(() => {
        toast({
          title: "Sucesso",
          description: "Senha Alterada com sucesso",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Erro na solicitação, tente novamente",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (idRequest === null) navigate("/login");
  }, [idRequest, navigate]);

  return (
    <Stack
      bg={"#FF735C"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
    >
      <Stack
        as="form"
        onSubmit={resetPassword}
        w={["100%", "100%", "100%", "50%", "50%"]}
        bg={"white"}
        p={10}
        borderRadius={4}
      >
        <FormLabel>Insira o PIN recebido em seu E-mail</FormLabel>
        <HStack>
          <PinInput
            onChange={(e) => {
              setFormData((a) => {
                return { ...a, numeroDeRecuperacao: parseInt(e) };
              });
            }}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <Box>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setFormData((a) => {
                  return { ...a, login: e.target.value };
                });
              }}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Nova Senha</FormLabel>
            <Input
              type="password"
              onChange={(e) => {
                setFormData((a) => {
                  return { ...a, senha: e.target.value };
                });
              }}
              required
            />
            <FormLabel>Confirme a nova senha</FormLabel>
            <Input
              type="password"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
            />
          </FormControl>
        </Box>
        <Button type="submit">Alterar a senha</Button>
      </Stack>
    </Stack>
  );
};
export default PasswordReset;
