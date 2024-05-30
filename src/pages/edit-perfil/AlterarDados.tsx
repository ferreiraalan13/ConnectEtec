import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useRequestProfile } from "../../services/hooks/useRequestProfile";
import { configApi } from "../../services/configApi";

interface FormData {
  nomeCompleto?: string;
  nomeSocial?: string | null;
  sobre?: string | null;
}

const AlterarDados: React.FC = () => {
  const { data } = useRequestProfile();
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    nomeSocial: "",
    sobre: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        nomeCompleto: data.nomeCompleto || "",
        nomeSocial: data.nomeSocial || "",
        sobre: data.sobre || "",
      });
    }
  }, [data]);

  const handleFormSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData };
    if (updatedFormData.nomeSocial === "") {
      updatedFormData.nomeSocial = null;
    }
    if (updatedFormData.sobre === "") {
      updatedFormData.sobre = null;
    }

    try {
      await configApi.patch("perfilUsuario/editarDados", updatedFormData);
      toast({
        title: "Sucesso",
        description: "Dados alterados com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar dados, tente novamente",
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
          <FormLabel>Nome Completo</FormLabel>
          <Input
            required
            type="text"
            value={formData.nomeCompleto}
            onChange={(e) =>
              setFormData({ ...formData, nomeCompleto: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nome Social</FormLabel>
          <Input
            type="text"
            value={formData.nomeSocial || ""}
            onChange={(e) =>
              setFormData({ ...formData, nomeSocial: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Sobre você</FormLabel>
          <Textarea
            placeholder="Utilize esse campo para escrever um pouco sobre você, o que gosta de fazer, etc."
            value={formData.sobre || ""}
            onChange={(e) =>
              setFormData({ ...formData, sobre: e.target.value })
            }
          />
        </FormControl>
        <Button type="submit">Alterar dados pessoais</Button>
      </Stack>
    </Stack>
  );
};

export default AlterarDados;
