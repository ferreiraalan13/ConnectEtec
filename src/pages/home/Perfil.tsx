import {
  Avatar,
  Box,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
// import Banner from "../../assets/Background.svg";
import { useRequestProfile } from "../../services/hooks/useRequestProfile";
import { useRequestMeusPosts } from "../../services/hooks/useRequestMeusPosts";
import PostGeral from "../../components/PostGeral";
import { useRequestMeusSeguidores } from "../../services/hooks/useRequestMeusSeguidores";
import { useNavigate } from "react-router-dom";
import { useRequestMeusSeguindo } from "../../services/hooks/useRequestMeusSeguindo";

export default function Perfil() {
  const { data } = useRequestProfile();
  const meusSeguidores = useRequestMeusSeguidores();
  const getSeguindo = useRequestMeusSeguindo();
  const navigate = useNavigate();

  return (
    <Box
      className="flex flex-col gap-5"
      bg="white"
      maxW="800px"
      h=""
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
          <Text fontWeight="semibold" ml={160} fontSize="30px">
            {data?.nomeCompleto}{" "}
          </Text>
          <Stack ml={160}>
            <Text fontSize="18px">Seguidores: {data?.qtdSeguidores}</Text>{" "}
            <Text fontSize="18px">Seguindo: {data?.qtdUsuariosSeguidos}</Text>
          </Stack>
        </Stack>
      </Stack>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Postagens</Tab>
          <Tab>Conexões</Tab>
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
              <PostGeral useRequestPosts={useRequestMeusPosts} />
            </div>
          </TabPanel>
          <TabPanel>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Seguidores</Tab>
                <Tab>Seguindo</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {meusSeguidores?.data ? (
                    <div className="flex flex-col gap-3">
                      {meusSeguidores?.data?.map((seguidor, index) => (
                        <Flex
                          key={index}
                          h="fit-content"
                          align="center"
                          gap={6}
                          p={2}
                        >
                          <Avatar
                            onClick={() => {
                              navigate("/perfil-usuario", {
                                state: seguidor.login,
                              });
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
                <TabPanel>
                  {getSeguindo?.data ? (
                    <div className="flex flex-col gap-3">
                      {getSeguindo?.data?.map((seguindo, index) => (
                        <Flex
                          key={index}
                          h="fit-content"
                          align="center"
                          gap={6}
                          p={2}
                        >
                          <Avatar
                            onClick={() => {
                              navigate("/perfil-usuario", {
                                state: seguindo.login,
                              });
                            }}
                            src={seguindo?.urlFotoPerfil || ""}
                            name={seguindo?.nomePerfilUsuario}
                          />
                          <Text>{seguindo?.nomePerfilUsuario}</Text>
                        </Flex>
                      ))}
                    </div>
                  ) : (
                    <Text>Sem Seguidores</Text>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
