import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

interface FormData {
  fotoPerfil?: string;
  banner?: string;
  sobre?: string;
}

const ConfigPerfil: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fotoPerfil: "",
    banner: "",
    sobre: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl p={5}>
        <Box textAlign={"center"} mb={4} fontSize="xl" fontWeight="bold">
          Editar Perfil
        </Box>

        <Box width={"500px"} p={2}>
          <FormLabel fontWeight={"bold"}>Foto de perfil</FormLabel>
          <Input
            alignContent={"center"}
            type="file"
            value={formData.fotoPerfil}
            onChange={(e) =>
              setFormData({ ...formData, fotoPerfil: e.target.value })
            }
          />

          <FormLabel fontWeight={"bold"} mt={4}>
            Banner Perfil
          </FormLabel>
          <Input
            alignContent={"center"}
            type="file"
            value={formData.banner}
            onChange={(e) =>
              setFormData({ ...formData, banner: e.target.value })
            }
          />

          <Text fontWeight={"bold"} mt={4} mb={2}>
            Sobre:
          </Text>
          <Textarea
            placeholder="Escreva aqui um pouco sobre você"
            size="sm"
            resize="vertical"
            value={formData.sobre}
            onChange={(e) =>
              setFormData({ ...formData, sobre: e.target.value })
            }
          />
        </Box>
        <Box textAlign={"center"}>
          <Button textAlign={"center"} type="submit" mt={4} colorScheme="blue">
            Finalizar
          </Button>
        </Box>
      </FormControl>
    </form>
  );
};

export default ConfigPerfil;
