import {
  Avatar,
  Box,
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

export default function Perfil() {
  const { data } = useRequestProfile();

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
          <Text mt={5} fontWeight="semibold" ml={180} fontSize="30px">
            {data?.nomeCompleto}{" "}
            <Text fontSize="18px">Seguidores: {data?.qtdSeguidores}</Text>{" "}
            <Text fontSize="18px">Seguindo: {data?.qtdUsuariosSeguidos}</Text>
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
              <PostGeral useRequestPosts={useRequestMeusPosts} />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
