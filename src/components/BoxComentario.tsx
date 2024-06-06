import {
  Avatar,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { configApi } from "../services/configApi";
import { useRequestProfile } from "../services/hooks/useRequestProfile";
import { MessageSquare } from "lucide-react";

interface ComentarioData {
  idComentario: string;
  nomeAutor: string;
  urlFotoPerfilUsuario: string;
  urlMidia: string;
  conteudo: string;
  momento: string;
  qtdLike: number;
  comentarioCurtido: boolean;
}

export default function BoxComentario({ idPost }: { idPost: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conteudo, setConteudo] = useState("");
  const [comentarios, setComentarios] = useState<ComentarioData[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchComentarios();
    }
  }, [isOpen]);

  const fetchComentarios = async () => {
    try {
      const response = await configApi.get(`/comentario?idPost=${idPost}`);

      if (response.status === 204) {
        setComentarios([]);
      } else {
        setComentarios(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (idPost && conteudo.trim()) {
      try {
        await configApi.post("/comentario", {
          idPost,
          conteudo,
        });
        fetchComentarios();
        setConteudo("");
        onClose();
      } catch (error) {
        console.error("Erro ao enviar comentário:", error);
      }
    }
  };
  const { data } = useRequestProfile();

  return (
    <>
      <Stack w="100%" onClick={onOpen} align="center">
        <MessageSquare />
      </Stack>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="800px" maxW="1000px" overflow={"auto"}>
          <ModalHeader>Comentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={3}
            overflow={"auto"}
          >
            {comentarios.map((comentario) => (
              <Stack
                key={comentario.idComentario}
                p={3}
                borderRadius="4px"
                boxShadow="2px 2px 2px 2px rgba(0,0,0,0.2)"
              >
                <Stack flexDir="row" align="center">
                  <Avatar
                    src={comentario.urlFotoPerfilUsuario}
                    name={comentario.nomeAutor}
                  />
                  <Box>
                    <Text>{comentario.nomeAutor}</Text>
                    <Text fontSize="14px">{comentario.momento}</Text>
                  </Box>
                </Stack>
                <Stack p={3}>
                  <Text>{comentario.conteudo}</Text>
                </Stack>
              </Stack>
            ))}
          </ModalBody>

          <ModalFooter
            h={"100px"}
            justifyContent={"flex-start"}
            boxShadow="2px 2px 10px 2px rgba(0,0,0,0.5)"
          >
            <Stack
              as="form"
              w="100%"
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit();
              }}
            >
              <Stack
                flexDir="row"
                align="center"
                justifyContent={"space-between"}
                w="100%"
              >
                <Avatar src={data?.urlFotoPerfil} />
                <Textarea
                  placeholder="Digite aqui seu comentario"
                  resize="none"
                  minH="0px"
                  minW="0px"
                  w={["150px", "200px", "200px", "800px", "800px"]}
                  h={"50px"}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                />
                <Button type="submit">Enviar</Button>
              </Stack>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
