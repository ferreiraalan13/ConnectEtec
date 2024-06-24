import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import DrawerExample from "../../components/DrawerExample";
import MenuFinal from "../../components/MenuFinal";
import { Check, Ellipsis, X } from "lucide-react";
import ConfirmDelete from "../../components/ConfirmacaoDelete";
import { configApi } from "../../services/configApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PostDenunciadoData,
  useRequestPostDenunciado,
} from "../../services/hooks/useRequestPostDenunciado";

const PostsDenunciados: React.FC = () => {
  const toast = useToast();
  const [posts, setPosts] = useState<PostDenunciadoData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data } = useRequestPostDenunciado();

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const approvePost = async (idPost: string) => {
    configApi
      .patch("post/gerenciarDenuncia", {
        idPost: idPost,
        blockPost: 2,
      })
      .then(() => {
        setPosts((value) => value.filter((post) => post.idPost !== idPost));
        toast({
          title: "Postagem liberada com sucesso",
          description: "",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Não foi possivel bloquear essa postagem",
          description: "",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const blockPost = async (idPost: string) => {
    configApi
      .patch("post/gerenciarDenuncia", {
        idPost: idPost,
        blockPost: 1,
      })
      .then(() => {
        setPosts((value) => value.filter((post) => post.idPost !== idPost));
        toast({
          title: "Postagem liberada com sucesso",
          description: "",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Não foi possivel bloquear essa postagem",
          description: "",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      className={`min-lg:hidden flex bg-gray-300`}
      flexDir={isMobile ? "column" : "row"}
    >
      {(isMobile && (
        <Box
          padding={""}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
              height: "0",
              borderRadius: "20px",
              backgroundColor: "darkgray",
              marginRight: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "20px",
            },
          }}
          width={"100%"}
        >
          <Box
            className="bg-white"
            px={1}
            h="70px"
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
            mb="10px"
            alignItems={"center"}
          >
            <div
              className={`text-black origin-left font-medium  text-2xl duration-300 p-3`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container position={"relative"} top={0} zIndex={1}></Container>
        </Box>
      )) || <MenuFinal />}
      <Flex h="100%" w="100%" overflowX="hidden">
        <Stack m={5} w="100%">
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
                        navigate("/perfil-usuario", {
                          state: post.loginAutor,
                        });
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
                flexWrap="wrap"
                gap={5}
                sx={{
                  "& > button": {
                    minW: "",
                  },
                }}
              >
                <Button
                  onClick={() => approvePost(post.idPost)}
                  bg="green"
                  color="white"
                  minW="180px"
                >
                  <Check />
                  <Text as="span" ml={2}>
                    Liberar post
                  </Text>
                </Button>
                <Button
                  onClick={() => blockPost(post.idPost)}
                  bg="red"
                  color="white"
                  minW="180px"
                >
                  <X />
                  <Text as="span" ml={2}>
                    Bloquear post
                  </Text>
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
      </Flex>
    </Stack>
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
        <ModalBody
          h="100%"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              maxH="90vdh"
              maxW="90vdw"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PostsDenunciados;
