import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Text,
  Image,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { ThumbsUp, MessageSquare, Ellipsis, Trash2 } from "lucide-react";

import { useRequestPost } from "../services/hooks/useRequestPost";
import { configApi } from "../services/configApi";
import { useRequestProfile } from "../services/hooks/useRequestProfile";

interface PostData {
  idPost: string;
  nomeAutor?: string;
  urlFotoPerfilUsuario?: string;
  nomeGrupo?: string;
  urlFotoPerfilGrupo?: string;
  urlMidia?: string;
  conteudo?: string;
  qtdLike?: string;
  momento?: string;
  postCurtido: boolean;
  tag?: string;
}

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

export default function Post() {
  const { data, isLoading } = useRequestPost();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Stack
        borderRadius={"4px"}
        w={"full"}
        bg={"white"}
        h={"385px"}
        align={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"30px"}>
          Carregando Posts Aguarde...
        </Text>
        <Spinner />
      </Stack>
    );
  }

  if (!data) {
    return (
      <Stack
        borderRadius={"4px"}
        w={"full"}
        bg={"white"}
        h={"385px"}
        align={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={"bold"} fontSize={"30px"}>
          Sem Posts no momento
        </Text>
      </Stack>
    );
  }

  const handleLike = async (postCurtido: boolean, idPost: string) => {
    await configApi.patch("post/curtir", {
      estaCurtido: postCurtido,
      idPost: idPost,
    });

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.idPost === idPost
          ? {
              ...post,
              postCurtido: !postCurtido,
              qtdLike: (postCurtido
                ? parseInt(post.qtdLike || "0") - 1
                : parseInt(post.qtdLike || "0") + 1
              ).toString(),
            }
          : post
      )
    );
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const handleDeletePost = async (idPost: string) => {
    try {
      await configApi.delete(`/post/${idPost}`);
      setPosts(posts.filter((post) => post.idPost !== idPost));
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
    }
  };

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.idPost}
          marginLeft={""}
          w={"full"}
          alignItems={"left"}
          padding={"0"}
        >
          <CardHeader w={"full"} fontSize={"sm"}>
            <Flex>
              <Flex flex="1" gap="5px" alignItems="center">
                <Avatar src={post.urlFotoPerfilUsuario} w={"80px"} h={"80px"} />
                <Box>
                  <Heading size="sm">{post.nomeAutor}</Heading>
                  <Text>{post.tag}</Text>
                  <Text>{post.momento}</Text>
                </Box>
              </Flex>

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Ellipsis />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      handleDeletePost(post.idPost);
                    }}
                    icon={<Trash2 />}
                  >
                    Excluir Postagem
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody maxW={"1000px"} fontSize={"small"} pt={0}>
            <Text whiteSpace="pre-wrap" fontSize={"18px"}>
              {post.conteudo}
            </Text>
          </CardBody>

          <div className="flex justify-center m-0">
            {post.urlMidia && (
              <Image
                flexWrap={"wrap"}
                objectFit="cover"
                borderRadius={"10px"}
                maxHeight={"350px"}
                maxWidth={"350px"}
                width={"100%"}
                src={post.urlMidia}
                onClick={() => handleImageClick(post.urlMidia || "")}
                cursor="pointer"
              />
            )}
          </div>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "",
              },
            }}
          >
            <Button
              onClick={() => {
                handleLike(post.postCurtido, post.idPost);
              }}
              flex="1"
              variant="ghost"
              colorScheme={post.postCurtido ? "blue" : "gray"}
            >
              <ThumbsUp />
            </Button>

            <Button flex="1" variant="ghost">
              <BoxComentario idPost={post.idPost} />
            </Button>
            <Stack flex="1" justify={"center"} align={"center"}>
              <Text fontWeight="bold">Curtidas: {post.qtdLike}</Text>
            </Stack>
          </CardFooter>
        </Card>
      ))}

      <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
    </>
  );
}

function BoxComentario({ idPost }: { idPost: string }) {
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
      const response = await configApi.post("/comentario/listar", { idPost });

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
                <Avatar src={data?.urlFotoPerfil} name="alan" />
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

function ImageModal({
  isOpen,
  onClose,
  imageUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"fit-content"} bg="transparent">
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          {imageUrl && <Image src={imageUrl} maxH="90vh" maxW="90vw" />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
