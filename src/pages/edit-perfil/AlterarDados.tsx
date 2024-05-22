import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
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
      alert("Dados alterados com sucesso!");
    } catch (error) {
      alert("Erro ao alterar dados.");
    }
  };

  return (
    <Stack p="5" borderRadius={"4"} display={"flex"} bg={'white'}>
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
