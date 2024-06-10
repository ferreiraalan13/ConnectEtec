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

import { useLocation } from "react-router-dom";

import Post from "../../components/Post";
import { useRequestUserProfile } from "../../services/hooks/useRequestUserProfile";

export default function PerfilUser() {
  const loginAutor = useLocation().state as string;
  const { data } = useRequestUserProfile(loginAutor);

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
      {/* <div className="w-[full] h-72 bg-gray-100 rounded-2xl">
        <div className="w-full h-36">
          <img
            src={Banner}
            alt=""
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="px-5 -translate-y-16 flex items-end">
            <Avatar src={data?.urlFotoPerfil} w={150} h={150} />
            <Text fontSize="2xl">{data?.nomeCompleto}</Text>
          </div>
        </div>
      </div> */}

      <Stack w="full" h="288px" bg="" gap={0} position="relative">
        <Avatar
          src={data?.urlFotoPerfil}
          w={150}
          h={150}
          position="absolute"
          top="calc(50% - 75px)"
          left="calc(10px)"
        />
        <Stack borderTopRadius={15} h="50%" bg="#ff7461"></Stack>
        <Stack p={1} h="50%" bg="#f3f4f6">
          <Text mt={5} fontWeight="semibold" ml={180} fontSize="2xl">
            {data?.nomeCompleto}
          </Text>
        </Stack>
      </Stack>
      {/* <div className="w-[full] h-72 bg-gray-100 rounded-2xl">
        <div className="w-full h-36">
          <img
            src={Banner}
            alt=""
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="px-5 -translate-y-16 flex items-end">
            <Avatar src={data?.urlFotoPerfil} w={150} h={150} />
            <Text fontSize="2xl">{data?.nomeCompleto}</Text>
          </div>
        </div>
      </div> */}

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
