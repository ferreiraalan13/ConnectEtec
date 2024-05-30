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

import Comentario from "./Comentario";
import { useRequestMeusPosts } from "../services/hooks/useRequestMeusPosts";

export default function MeusPosts() {
  const { data, isLoading } = useRequestMeusPosts();

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

  return (
    <>
      {data?.map((data) => (
        <Card
          key={data.idPost}
          marginLeft={""}
          w={"full"}
          alignItems={"left"}
          padding={"0"}
        >
          <CardHeader w={"full"} fontSize={"sm"}>
            <Flex>
              <Flex flex="1" gap="5px" alignItems="center">
                <Avatar src={data.urlFotoPerfilUsuario} w={"80px"} h={"80px"} />
                <Box>
                  <Heading size="sm">{data.nomeAutor}</Heading>
                  <Text>{data.tag}</Text>
                  <Text>{data.momento}</Text>
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
              {data.conteudo}
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
              src={data.urlMidia}
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
            <Button flex="1" variant="ghost">
              <ThumbsUp />
            </Button>
            <Button flex="1" variant="ghost">
              <BoxComentario />
            </Button>
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
