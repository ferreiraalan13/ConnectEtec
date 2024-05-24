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
} from "@chakra-ui/react";
import { ThumbsUp, MessageSquare, Ellipsis, Trash2 } from "lucide-react";

import { useRequestPost } from "../services/hooks/useRequestPost";

export default function Post() {
  const { data, isLoading } = useRequestPost();

  if (isLoading) {
    return <Text>Carregando</Text>;
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
              <Flex flex="1" gap="5px" alignItems="stretch">
                <Avatar src={data.urlFotoPerfilUsuario} w={"60px"} h={"60px"} />
                <Box>
                  <Heading size="sm">{data.nomeAutor}</Heading>
                  <Text fontSize={"small"}>{data.tag}</Text>
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
            <Text fontSize={{ sm: "10px", md: "15px" }}>{data.conteudo}</Text>
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
              <MessageSquare />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
