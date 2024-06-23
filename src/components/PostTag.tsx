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
import { useLocation, useNavigate } from "react-router-dom";
import { useRequestTagPost } from "../services/hooks/useRequestTagPost";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

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

export default function PostTag() {
  const toast = useToast();
  const tag = useLocation().state as string;
  const { data, isLoading } = useRequestTagPost(tag);
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
                    navigate("/perfil-usuario");
                  }}
                  cursor="pointer"
                />
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

      <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={selectedImage} />
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
          {imageUrl && (
            <TransformWrapper>
              <TransformComponent>
                <Image src={imageUrl} maxH="90vh" maxW="90vw" />
              </TransformComponent>
            </TransformWrapper>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
