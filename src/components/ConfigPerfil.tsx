import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios"; // Importe o Axios
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../firebase/firebase";

interface FormData {
  urlFotoPerfil?: string;
  sobre?: string;
  nomeSocial?: string;
  nomeCompleto?: string;
}

export default function ConfigPerfil() {

  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    urlFotoPerfil: "",
    sobre: "",
    nomeCompleto: "",
    nomeSocial: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fotoPerfil) {
      console.error("Nenhuma imagem selecionada.");
      return;
    }

    try {
      const timestamp = Date.now();
      const nomeArquivo = `${timestamp}_${fotoPerfil.name}`;

      const storageRef = ref(firebaseStorage, `imagens/${nomeArquivo}`);

      await uploadBytes(storageRef, fotoPerfil);

      const url = await getDownloadURL(storageRef);

      // Agora os dados devem estar atualizados antes de enviar para a API
      const formDataWithUrl = { ...formData, urlFotoPerfil: url };

      // Configurar o cabeçalho padrão com o token de autenticação
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("authToken")}`;

      // Envie os dados para a API
      await axios.put("http://localhost:8080/perfilUsuario/editar", formDataWithUrl);

      // Atualize o estado com a URL da imagem após o envio bem-sucedido
      setFormData(formDataWithUrl);

      console.log("Imagem enviada com sucesso para o Firebase Storage.");
      console.log("Dados enviados para a API:", formDataWithUrl);
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl p={5}>
        <Box textAlign={"center"} mb={4} fontSize="xl" fontWeight="bold">
          Editar Perfil
        </Box>

        <Box
          width={"500px"}
          p={2}
          display={"flex"}
          flexDirection={"column"}
          gap={5}
        >
          <Box>
            <FormLabel fontWeight={"bold"}>Foto de perfil</FormLabel>
            <Input
              alignContent={"center"}
              type="file"
              onChange={(e) =>
                setFotoPerfil(e.target.files ? e.target.files[0] : null)
              }
            />
          </Box>
          <Box>
            <FormLabel>Sobre</FormLabel>
            <Textarea
              onChange={(e) =>
                setFormData({ ...formData, sobre: e.target.value })
              }
            />
          </Box>
          <Box>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, nomeCompleto: e.target.value })
              }
            />
          </Box>
          <Box>
            <FormLabel>Nome Social</FormLabel>
            <Input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, nomeSocial: e.target.value })
              }
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Button textAlign={"center"} type="submit" mt={4} colorScheme="blue">
            Finalizar
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}
