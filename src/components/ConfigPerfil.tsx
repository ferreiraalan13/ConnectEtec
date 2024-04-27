import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../firebase";

export default function ConfigPerfil() {
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [imagemURL, setImagemURL] = useState<string | null>(null);

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
      setImagemURL(url);
      console.log(imagemURL);

      console.log("Imagem enviada com sucesso para o Firebase Storage.");
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

        <Box width={"500px"} p={2}>
          <FormLabel fontWeight={"bold"}>Foto de perfil</FormLabel>
          <Input
            alignContent={"center"}
            type="file"
            onChange={(e) =>
              setFotoPerfil(e.target.files ? e.target.files[0] : null)
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
}
