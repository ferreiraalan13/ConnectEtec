import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { FormEventHandler, useState } from "react";

import { configApi } from "../../services/configApi";

interface FormData {
  senhaAntiga?: string;
  novaSenha?: string | null;
}

const AlterarSenha: React.FC = () => {
  const toast = useToast();

  const [formData, setFormData] = useState<FormData>({
    senhaAntiga: "",
    novaSenha: "",
  });

  const [confirmSenha, setConfirmSenha] = useState({
    confirmSenha: "",
  });

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    if (formData.novaSenha != confirmSenha.confirmSenha) {
      toast({
        title: "Erro",
        description: "As senhas nao coincidem",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await configApi.patch("usuario/mudarSenha", formData);
      toast({
        title: "Sucesso",
        description: "Senha alterada com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      p="5"
      borderRadius={"4"}
      display={"flex"}
      bg={"white"}
      boxShadow="2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
    >
      <Stack as="form" w="100%" onSubmit={handleFormSubmit}>
        <FormControl>
          <FormLabel>Senha Antiga</FormLabel>
          <Input
            maxLength={230}
            required
            type="password"
            value={formData.senhaAntiga}
            onChange={(e) =>
              setFormData({ ...formData, senhaAntiga: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nova Senha</FormLabel>
          <Input
            maxLength={230}
            type="password"
            value={formData.novaSenha || ""}
            onChange={(e) =>
              setFormData({ ...formData, novaSenha: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirmar Senha</FormLabel>
          <Input
            maxLength={230}
            type="password"
            value={confirmSenha.confirmSenha || ""}
            onChange={(e) =>
              setConfirmSenha({ ...confirmSenha, confirmSenha: e.target.value })
            }
          />
        </FormControl>

        <Button type="submit">Alterar Senha</Button>
      </Stack>
    </Stack>
  );
};

export default AlterarSenha;
