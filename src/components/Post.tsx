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
import Comentario from "./Comentario";
import { configApi } from "../services/configApi";

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

export default function Post() {
  const { data, isLoading } = useRequestPost();
  const [posts, setPosts] = useState<PostData[]>([]);

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
                  <MenuItem icon={<Trash2 />}>Excluir Postagem</MenuItem>
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
            <Image
              flexWrap={"wrap"}
              objectFit="cover"
              borderRadius={"10px"}
              maxHeight={"350px"}
              maxWidth={"350px"}
              width={"100%"}
              src={post.urlMidia}
            />
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
              <BoxComentario />
            </Button>
            <Stack flex="1" justify={"center"} align={"center"}>
              <Text fontWeight="bold">Curtidas: {post.qtdLike}</Text>
            </Stack>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

function BoxComentario() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack w="100%" onClick={onOpen} align="center">
        <MessageSquare />
      </Stack>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="800px" w="100%" overflow={"auto"}>
          <ModalHeader>Comentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} gap={3}>
            <Comentario />
            <Comentario />
          </ModalBody>

          <ModalFooter justifyContent={"flex-start"}>
            <Stack>
              <Stack
                flexDir="row"
                align="center"
                justifyContent={"space-between"}
                w="100%"
              >
                <Avatar />
                <Textarea
                  resize="none"
                  minH="0px"
                  minW="0px"
                  w={["150px", "200px", "200px", "260px", "260px"]}
                />
                <Button>Enviar</Button>
              </Stack>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
