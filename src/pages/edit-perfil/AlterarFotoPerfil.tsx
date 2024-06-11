import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  FormControl,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useRequestProfile();
  const toast = useToast();
  const [fotoPublicacao, setFotoPublicacao] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    data?.urlFotoPerfil
  );
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
    const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
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
      setPreviewUrl(undefined);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Stack
      bg={"white"}
      p="5"
      borderRadius={"4"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      boxShadow="2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
    >
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center flex-col gap-2"
      >
        <Avatar src={previewUrl || ""} size="xl" mt="4" />
        <FormControl>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>

        <Button w={"100%"} type="submit" mt="4">
          {isSubmitting ? <Spinner /> : "Alterar foto de Perfil"}
        </Button>
      </form>
    </Stack>
  );
};

export default AlterarFotoPerfil;
