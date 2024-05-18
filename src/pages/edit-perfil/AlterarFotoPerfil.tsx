import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../../firebase/firebase";
import { configApi } from "../../services/configApi";
import { useRequestProfile } from "../../services/hooks/useRequestProfile";

interface FormData {
  urlFotoPerfil?: string;
}

const AlterarFotoPerfil: React.FC = () => {
  const { data } = useRequestProfile();
  const toast = useToast();
  const [fotoPublicacao, setFotoPublicacao] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    data?.urlFotoPerfil
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    urlFotoPerfil: "",
  });

  useEffect(() => {
    setPreviewUrl(data?.urlFotoPerfil);
  }, [data?.urlFotoPerfil]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fotoPublicacao) {
      toast({
        title: "Errro",
        description: "Nenhuma imagem selecionada",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidImage = (file: File): boolean => {
    const acceptedTypes = ["jpeg", "png", "gif"];
    return acceptedTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && isValidImage(file)) {
      setFotoPublicacao(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      toast({
        title: "Erro, Tipo de arquivo não suportado.",
        description: "Por favor, selecione um arquivo com extensao: jpg, png",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setFotoPublicacao(null);
      setPreviewUrl(data?.urlFotoPerfil);
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
      alignContent={"center"}
    >
      <form onSubmit={handleFormSubmit}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          mb="10px"
          alignItems={"center"}
          gap={10}
        >
          <Avatar src={previewUrl || ""} size="xl" mt="4" />
          <FormControl>
            <FormLabel textAlign={"center"}>Alterar foto de perfil</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormControl>
        </Box>

        <Button type="submit" mt="4">
          {isSubmitting ? <Spinner /> : "Alterar foto de Perfil"}
        </Button>
      </form>
    </Stack>
  );
};

export default AlterarFotoPerfil;
