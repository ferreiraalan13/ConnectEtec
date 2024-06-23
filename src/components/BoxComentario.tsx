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
  Spinner,
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
import { useNavigate } from "react-router-dom";

interface ComentarioData {
  idComentario: string;
  nomeAutor: string;
  loginAutor: string;
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
  onCommentsChange,
}: {
  idPost: string;
  children: ReactNode;
  onCommentsChange: (idPost: string, newCount: number) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conteudo, setConteudo] = useState("");
  const [comentarios, setComentarios] = useState<ComentarioData[]>([]);
  const toast = useToast();
  const { data } = useRequestProfile();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchComentarios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const fetchComentarios = async () => {
    try {
      setIsLoading(true);
      const response = await configApi.get(`/comentario?idPost=${idPost}`);

      if (response.status === 204) {
        setComentarios([]);
      } else {
        setComentarios(response.data);
      }
      onCommentsChange(idPost, response.data.length);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setIsLoading(false);
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
        <ModalContent h="600px" maxW="1000px" overflow={"auto"} mx={2}>
          <ModalHeader>Comentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={3}
            overflow={"auto"}
          >
            {(isLoading && (
              <Stack justify="center" align="center" height="100%">
                <Spinner />
              </Stack>
            )) ||
              (!comentarios.length && (
                <Stack justify="center" align="center" height="100%">
                  <Text fontSize="23px">Sem comentarios no momento</Text>
                </Stack>
              ))}

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
                      onClick={() => {
                        navigate("/perfil-usuario", {
                          state: comentario.loginAutor,
                        });
                      }}
                      cursor="pointer"
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
