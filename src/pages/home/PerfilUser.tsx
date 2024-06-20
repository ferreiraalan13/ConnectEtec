import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Post from "../../components/Post";
import { useRequestUserProfile } from "../../services/hooks/useRequestUserProfile";
import { configApi } from "../../services/configApi";

export default function PerfilUser() {
  const loginAutor = useLocation().state as string;
  const { data, refetch } = useRequestUserProfile(loginAutor);

  const [estaSeguido, setEstaSeguido] = useState(data?.estaSeguido);

  const handleFollowClick = async () => {
    const newFollowStatus = !estaSeguido;
    try {
      await configApi.patch("perfilUsuario/seguir", {
        estaSeguido: data?.estaSeguido,
        loginUsuarioSeguido: loginAutor,
      });
      setEstaSeguido(newFollowStatus);

      refetch();
    } catch (error) {
      alert("Failed to follow/unfollow user:");
    }
  };

  return (
    <Box
      className="flex flex-col gap-5"
      bg="white"
      maxW="800px"
      h="fit-content"
      padding="10px"
      borderRadius={"16px"}
      marginLeft={""}
    >
      <Stack w="full" h="288px" bg="" gap={0} position="relative">
        <Avatar
          src={data?.urlFotoPerfil}
          w={130}
          h={130}
          position="absolute"
          top="calc(50% - 75px)"
          left="calc(10px)"
        />
        <Stack borderTopRadius={15} h="50%" bg="#ff7461">
          <Stack h="100%" align="flex-end" p={15} justify="center">
            <Text color="white" fontWeight="bold" fontSize="18px">
              Seguidores: {data?.qtdSeguidores}
            </Text>{" "}
            <Text fontWeight="bold" color="white" fontSize="18px">
              Seguindo: {data?.qtdUsuariosSeguidos}
            </Text>
            {data?.estaSeguido !== null && (
              <Button w="fit-content" onClick={handleFollowClick}>
                {estaSeguido ? "Parar de Seguir" : "Seguir Usuario"}
              </Button>
            )}
          </Stack>
        </Stack>
        <Stack p={1} h="50%" bg="#f3f4f6">
          <Text mt={5} fontWeight="semibold" ml={180} fontSize="2xl">
            {data?.nomeCompleto}
          </Text>
        </Stack>
      </Stack>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Postagens</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <h1 className="">Biografia</h1>
              <Text mt="20px" whiteSpace="pre-wrap">{`${data?.sobre}`}</Text>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-3">
              <Post />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
