import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import axios from "axios"; // Importe o Axios
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../firebase";

interface FormData {
  imagemURL?: string;
  sobre?: string;
}

export default function ConfigPerfil() {
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    imagemURL: "",
    sobre: "",
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
      const formDataWithUrl = { ...formData, imagemURL: url };
  
      // Envie os dados para a API
      await axios.post("sua_url_de_api_aqui", formDataWithUrl);
  
      // Atualize o estado com a URL da imagem após o envio bem-sucedido
      setFormData(formDataWithUrl);
  
      console.log("Imagem enviada com sucesso para o Firebase Storage.");
      console.log("Dados enviados para a API:", formDataWithUrl);
    } catch (error) {
      console.error("Erro ao enviar imagem para o Firebase Storage:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl p={5}>
        <Box textAlign={"center"} mb={4} fontSize="xl" fontWeight="bold">
          Editar Perfil
        </Box>

        <Box width={"500px"} p={2} display={'flex'} flexDirection={'column'} gap={5} >
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
