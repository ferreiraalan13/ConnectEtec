import {
  Box,
  Button,
  Textarea,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useToast,
  Spinner,
  Stack,
  Text,
  Avatar,
} from "@chakra-ui/react";

import { Image } from "lucide-react";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage as firebaseStorage } from "../firebase/firebase";
// import { useNavigate } from "react-router-dom";
import { configApi } from "../services/configApi";

import { useRequestProfile } from "../services/hooks/useRequestProfile";

interface FormData {
  urlMidia?: string | null;
  conteudo?: string;
  idGrupo?: string | null;
  tag?: string;
}

export default function CriarPost() {
  const { data } = useRequestProfile();
  const toast = useToast();
  // const navigate = useNavigate();
  const [fotoPublicacao, setFotoPublicacao] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    urlMidia: null,
    conteudo: "",
    idGrupo: null,
    tag: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      let url: string | null = null;
      if (fotoPublicacao) {
        const timestamp = Date.now();
        const nomeArquivo = `${timestamp}_${fotoPublicacao.name}`;

        const storageRef = ref(
          firebaseStorage,
          `imagens/publicacao/${nomeArquivo}`
        );

        await uploadBytes(storageRef, fotoPublicacao);
        url = await getDownloadURL(storageRef);
      }

      const formDataWithUrl = { ...formData, urlMidia: url };

      await configApi.post("http://localhost:8080/post/criar", formDataWithUrl);

      setFormData(formDataWithUrl);

      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
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
    <form action="" onSubmit={handleFormSubmit}>
      <Stack
        flexDir={"column"}
        gap={10}
        bg="white"
        maxW="1000px"
        h="600px"
        padding="10px"
        borderRadius={"16px"}
        marginLeft={""}
      >
        <div className="flex justify-center gap font-bold text-2xl">
          Criar Publicação
        </div>

        <Stack
          flexDir={"row"}
          align={"center"}
          p={3}
          borderRadius={"10px"}
          boxShadow="2px 2px 2px 2px rgba(0,0,0,0.2)"
        >
          <Avatar
            w={"80px"}
            h={"80px"}
            src={data?.urlFotoPerfil}
            name={data?.nomeCompleto}
          />
          <Text fontSize={"20px"}>{data?.nomeCompleto}</Text>
        </Stack>

        <Select
          placeholder="Assunto"
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          required
        >
          <option value="DESENVOLVIMENTO_DE_SISTEMAS">
            Desenvolvimento de sistemas
          </option>
          <option value="RECURSOS_HUMANOS">Recursos Humanos</option>
          <option value="CONTABILIDADE">Contabilidade</option>
          <option value="SEGURANCA_DO_TRABALHO">Segurança do trabalho</option>
          <option value="NOTICIA">Notícia</option>
          <option value="EVENTO">Evento</option>
          <option value="OUTRO">Outro</option>
        </Select>

        <Textarea
          onChange={(e) =>
            setFormData({ ...formData, conteudo: e.target.value })
          }
          placeholder="O que voce esta pensando?"
          required
        />

        <InputGroup>
          <InputLeftAddon>{<Image />}</InputLeftAddon>
          <Input type="file" p={1} onChange={handleFileChange} />
        </InputGroup>

        <Button
          colorScheme="teal"
          variant="solid"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Publicar"}
        </Button>
      </Stack>
    </form>
  );
}
