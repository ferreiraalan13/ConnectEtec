import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../../firebase/firebase";
import { configApi } from "../../services/configApi";

interface FormData {
  urlFotoPerfil?: string;
}

const AlterarFotoPerfil: React.FC = () => {
  const toast = useToast();
  const [fotoPublicacao, setFotoPublicacao] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    urlFotoPerfil: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fotoPublicacao) {
      console.error("Nenhuma imagem selecionada.");
      return;
    }

    try {
      const timestamp = Date.now();
      const nomeArquivo = `${timestamp}_${fotoPublicacao.name}`;

      const storageRef = ref(firebaseStorage, `imagens/perfil/${nomeArquivo}`);

      await uploadBytes(storageRef, fotoPublicacao);

      const url = await getDownloadURL(storageRef);

      const formDataWithUrl = { ...formData, urlFotoPerfil: url };

      await configApi.patch("perfilUsuario/editarFotoPerfil", formDataWithUrl);

      setFormData(formDataWithUrl);

      toast({
        title: "Sucesso",
        description: "Foto de perfil alterada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao atualizar foto de perfil", error);
    }
  };

  const isValidImage = (file: File): boolean => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
    return acceptedTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && isValidImage(file)) {
      setFotoPublicacao(file);
    } else {
      toast({
        title: "Erro, Tipo de arquivo não suportado.",
        description: "Por favor, selecione um arquivo com extensao: jpg, png",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setFotoPublicacao(null);
    }
  };

  return (
    <Stack
      p="5"
      border={"1px solid"}
      borderRadius={"4"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={handleFormSubmit}>
        <Avatar src="" size="xl" mt="4" />
        <FormControl>
          <FormLabel>Alterar foto de perfil</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>

        <Button type="submit" mt="4">
          Alterar foto de perfil
        </Button>
      </form>
    </Stack>
  );
};

export default AlterarFotoPerfil;
