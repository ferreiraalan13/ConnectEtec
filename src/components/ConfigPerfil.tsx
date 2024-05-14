import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { configApi } from "../services/configApi";
import { useRequestProfile } from "../services/hooks/useRequestProfile";

interface PerfilData {
  nomeCompleto?: string;
  nomeSocial?: string;
  nomeUsuario?: string;
  urlFotoPerfil?: string;
  sobre?: string;
}

interface FormData {
  urlFotoPerfil?: string;
  sobre?: string;
  nomeSocial?: string;
  nomeCompleto?: string;
}

export default function ConfigPerfil() {
  const [, setPerfilData] = useState<PerfilData | null>(null);
  const { data } = useRequestProfile();

  useEffect(() => {
    setPerfilData(data || null);

    setFormData({
      urlFotoPerfil: data?.urlFotoPerfil || "",
      sobre: data?.sobre || "",
      nomeCompleto: data?.nomeCompleto || "",
      nomeSocial: data?.nomeSocial || "",
    });
  }, [data]);

  const navigate = useNavigate();
  const toast = useToast();
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    urlFotoPerfil: "",
    sobre: "",
    nomeCompleto: "",
    nomeSocial: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fotoPerfil) {
      toast({
        title: "Erro",
        description:
          "Por favor, selecione uma foto de perfil válida para continuar",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const timestamp = Date.now();
      const nomeArquivo = `${timestamp}_${fotoPerfil.name}`;

      const storageRef = ref(
        firebaseStorage,
        `imagens/publicacao/${nomeArquivo}`
      );

      await uploadBytes(storageRef, fotoPerfil);

      const url = await getDownloadURL(storageRef);

      const formDataWithUrl = { ...formData, urlFotoPerfil: url };

      await configApi.put("perfilUsuario/editar", formDataWithUrl);

      setFormData(formDataWithUrl);

      toast({
        title: "Sucesso",
        description: "Cadastro atualizado com sucesso",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/home");
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidImage = (file: File): boolean => {
    const acceptedTypes = ["image/jpeg", "image/png", "image/gif"]; // Tipos de imagem aceitos
    return acceptedTypes.includes(file.type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && isValidImage(file)) {
      setFotoPerfil(file);
    } else {
      toast({
        title: "Erro, Tipo de arquivo não suportado.",
        description: "Por favor, selecione um arquivo com extensão: jpg, png",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setFotoPerfil(null);
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
              onChange={handleFileChange}
              defaultValue={formData.urlFotoPerfil}
            />
          </Box>
          <Box>
            <FormLabel>Sobre</FormLabel>
            <Textarea
              defaultValue={formData.sobre}
              onChange={(e) =>
                setFormData({ ...formData, sobre: e.target.value })
              }
            />
          </Box>
          <Box>
            <FormLabel>Nome Completo</FormLabel>
            <Input
              type="text"
              defaultValue={formData.nomeCompleto}
              onChange={(e) =>
                setFormData({ ...formData, nomeCompleto: e.target.value })
              }
            />
          </Box>
          <Box>
            <FormLabel>Nome Social</FormLabel>
            <Input
              type="text"
              defaultValue={formData.nomeSocial}
              onChange={(e) =>
                setFormData({ ...formData, nomeSocial: e.target.value })
              }
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Button
            textAlign={"center"}
            type="submit"
            mt={4}
            colorScheme="blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner /> : "Finalizar"}
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}
