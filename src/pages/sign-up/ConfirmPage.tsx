import {
  Button,
  FormLabel,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import { configApi } from "../../services/configApi";
import { useLocation, useNavigate } from "react-router-dom";

interface FormData {
  nomeCompleto: string;
  nomeSocial?: string | null;
  login: string;
  senha: string;
  tipoUsuario?: string;
  idRequest?: string;
  codigoDeValidacao?: number;
}

const SignUpConfirm: React.FC = () => {
  const dados = useLocation().state;



  const [formData, setFormData] = useState<FormData>({
    login: dados.login,
    senha: dados.senha,
    nomeCompleto: dados.nomeCompleto,
    nomeSocial: dados.nomeSocial,
    tipoUsuario: dados.tipoUsuario,
    idRequest: dados.idRequest,
    codigoDeValidacao: dados.codigoDeValidacao,
  });

  const navigate = useNavigate();
  const toast = useToast();

  const resetPassword: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    configApi
      .post("usuario/cadastrar", formData)
      .then(() => {
        toast({
          title: "Sucesso",
          description: "Confirmacao realizada com sucesso, faça seu login!",
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

  return (
    <Stack
      bg={"#FF735C"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    
      
    >
      <Stack
        as="form"
        onSubmit={resetPassword}
        w={"50%"}
        bg={"white"}
        p={10}
        borderRadius={4}
        display={"flex"}
        gap={10}
        alignItems={"center"}
        minW={'300px'}
      >
        <FormLabel>
          Para finalizar seu cadastro, Insira o PIN recebido em seu E-mail: {formData.login}
        </FormLabel>
        <HStack>
          <PinInput
            onChange={(e) => {
              setFormData((a) => {
                return { ...a, codigoDeValidacao: parseInt(e) };
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

        <Button type="submit">Confirmar E-mail</Button>
      </Stack>
    </Stack>
  );
};
export default SignUpConfirm;
