import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
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
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { configApi } from "../services/configApi";
import { useRequestProfile } from "../services/hooks/useRequestProfile";
import { Ellipsis, MessageSquare } from "lucide-react";
import ConfirmDelete from "./ConfirmacaoDelete";

interface ComentarioData {
  idComentario: string;
  nomeAutor: string;
  urlFotoPerfilUsuario: string;
  urlMidia: string;
  conteudo: string;
  momento: string;
  qtdLike: number;
  comentarioCurtido: boolean;
  children: ReactNode;
}

export default function BoxComentario({
  idPost,
  children,
}: {
  idPost: string;
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conteudo, setConteudo] = useState("");
  const [comentarios, setComentarios] = useState<ComentarioData[]>([]);
  const toast = useToast();
  const { data } = useRequestProfile();

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

  const handleDeleteComentario = async (idComentario: string) => {
    try {
      await configApi.delete(
        `/comentario?idComentario=${idComentario}&idPost=${idPost}`
      );
      toast({
        title: "Comentario excluido com sucesso",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchComentarios();
    } catch (error) {
      toast({
        title: "Ops",
        description: "Você não tem permissão para essa ação.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Stack
        w="100%"
        onClick={onOpen}
        align="center"
        flexDir="row"
        justify="center"
      >
        <MessageSquare />
        <Text fontSize="20px">{children}</Text>
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
                <Stack
                  flexDir="row"
                  align="center"
                  justifyContent="space-between"
                >
                  <Stack flexDir="row">
                    <Avatar
                      src={comentario.urlFotoPerfilUsuario}
                      name={comentario.nomeAutor}
                    />

                    <Box>
                      <Text>{comentario.nomeAutor}</Text>
                      <Text fontSize="14px">{comentario.momento}</Text>
                    </Box>
                  </Stack>

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<Ellipsis />}
                      variant="outline"
                    />
                    <MenuList>
                      <ConfirmDelete title="Excluir Comentario">
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            handleDeleteComentario(comentario.idComentario);
                          }}
                          ml={3}
                        >
                          Deletar
                        </Button>
                      </ConfirmDelete>
                    </MenuList>
                  </Menu>
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
