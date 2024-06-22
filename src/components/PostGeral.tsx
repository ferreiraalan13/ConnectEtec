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
  Stack,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { ThumbsUp, Ellipsis } from "lucide-react";
import { configApi } from "../services/configApi";
import BoxComentario from "./BoxComentario";
import ConfirmDelete from "./ConfirmacaoDelete";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "react-query";
import { AxiosError } from "axios";

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
  loginAutor?: string;
  qtdComentarios?: number;
  usuarioADM?: boolean;
}

interface PostProps {
  useRequestPosts: () => UseQueryResult<PostData[], AxiosError>;
}

const PostGeral = ({ useRequestPosts }: PostProps) => {
  const toast = useToast();
  const { data, isLoading } = useRequestPosts();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
      await configApi.delete(`/post?idPost=${idPost}`);
      setPosts(posts.filter((post) => post.idPost !== idPost));
      toast({
        title: "Postagem excluida com sucesso",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
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

  const handleCommentsChange = (idPost: string, newCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.idPost === idPost ? { ...post, qtdComentarios: newCount } : post
      )
    );
  };

  return (
    <>
      <Stack w="100%">
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
                  <Avatar
                    src={post.urlFotoPerfilUsuario}
                    w={"80px"}
                    h={"80px"}
                    onClick={() => {
                      navigate("/perfil-usuario", { state: post.loginAutor });
                    }}
                    cursor="pointer"
                  />
                  <Box ml={4}>
                    <Heading size="sm">
                      <Flex gap={2}>{post.nomeAutor} </Flex>
                    </Heading>
                    <Text fontWeight={"bold"} color="#ff7461">
                      {post.usuarioADM ? "(Administrador)" : ""}
                    </Text>

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
                    <ConfirmDelete title="Excluir Postagem">
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          handleDeletePost(post.idPost);
                          onClose();
                        }}
                        ml={3}
                      >
                        Deletar
                      </Button>
                    </ConfirmDelete>
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>
            <CardBody maxW={"1000px"} fontSize={"small"} pt={0}>
              <Text whiteSpace="pre-wrap" fontSize={"18px"}>
                {post.conteudo}
              </Text>
            </CardBody>

            <Stack bg={""} w={""} align={"center"} px={4}>
              {post.urlMidia && (
                <Image
                  flexWrap={"wrap"}
                  objectFit="cover"
                  borderRadius={"10px"}
                  maxHeight={"500px"}
                  maxWidth={"500px"}
                  width={"100%"}
                  src={post.urlMidia}
                  onClick={() => handleImageClick(post.urlMidia || "")}
                  cursor="pointer"
                />
              )}
            </Stack>

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
                <ThumbsUp />{" "}
                <Text fontSize={"20px"} ml={4}>
                  {post.qtdLike}
                </Text>
              </Button>

              <Button flex="1" variant="ghost">
                <BoxComentario
                  idPost={post.idPost}
                  onCommentsChange={handleCommentsChange}
                >
                  <span>{post.qtdComentarios}</span>
                </BoxComentario>
              </Button>
            </CardFooter>
          </Card>
        ))}

        <ImageModal
          isOpen={isOpen}
          onClose={onClose}
          imageUrl={selectedImage}
        />
      </Stack>
    </>
  );
};

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
        <Stack align="flex-end">
          <Button mr={4} w="fit-content" onClick={onClose}>
            X
          </Button>
        </Stack>
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          {imageUrl && <Image src={imageUrl} maxH="90vh" maxW="90vw" />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostGeral;
