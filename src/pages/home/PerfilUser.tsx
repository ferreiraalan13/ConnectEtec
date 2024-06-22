import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../components/Post";
import { useRequestUserProfile } from "../../services/hooks/useRequestUserProfile";
import { configApi } from "../../services/configApi";
import { useRequestSeguidores } from "../../services/hooks/useRequestSeguidores";

export default function PerfilUser() {
  const loginAutor = useLocation().state as string;
  const { data, refetch } = useRequestUserProfile(loginAutor);
  const getSeguidores = useRequestSeguidores(loginAutor);
  const navigate = useNavigate();

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
        <Stack borderTopRadius={15} h="50%" bg="#ff7461"></Stack>
        <Stack p={1} h="fit-content" bg="#f3f4f6">
          <Stack ml={160}>
            <Flex
              gap={2}
              flexDir={["column", "column", "column", "row", "row"]}
            >
              <Text fontWeight="semibold" fontSize="2xl">
                {data?.nomeUsuario || ""}
              </Text>
              {data?.estaSeguido !== null && (
                <Button
                  px={0}
                  p={2}
                  bg={"#fd4e37"}
                  color="white"
                  w="fit-content"
                  onClick={handleFollowClick}
                >
                  {estaSeguido ? "Parar de Seguir" : "Seguir Usuario"}
                </Button>
              )}
            </Flex>

            <Stack>
              <Text fontSize="18px">Seguidores: {data?.qtdSeguidores}</Text>{" "}
              <Text fontSize="18px">Seguindo: {data?.qtdUsuariosSeguidos}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Postagens</Tab>
          <Tab>Seguidores</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <h1 className="">Biografia</h1>
              {data?.sobre === null ? (
                ""
              ) : (
                <Text mt="20px" whiteSpace="pre-wrap">{`${data?.sobre}`}</Text>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-3">
              <Post />
            </div>
          </TabPanel>
          <TabPanel>
            {getSeguidores?.data ? (
              <div className="flex flex-col gap-3">
                {getSeguidores?.data?.map((seguidor, index) => (
                  <Flex
                    key={index}
                    h="fit-content"
                    align="center"
                    gap={6}
                    p={2}
                  >
                    <Avatar
                      onClick={() => {
                        navigate("/perfil-usuario", { state: seguidor.login });
                      }}
                      src={seguidor?.urlFotoPerfil || ""}
                      name={seguidor?.nomePerfilUsuario}
                    />
                    <Text>{seguidor?.nomePerfilUsuario}</Text>
                  </Flex>
                ))}
              </div>
            ) : (
              <Text>Sem Seguidores</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
