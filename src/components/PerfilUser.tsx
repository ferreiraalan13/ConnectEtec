import {
  Avatar,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Banner from "../assets/Background.svg";
import { useRequestProfile } from "../services/hooks/useRequestProfile";
import PostGeral from "./PostGeral";
import { useRequestPost } from "../services/hooks/useRequestPost";
import { useRequestMeusPosts } from "../services/hooks/useRequestMeusPosts";

export default function PerfilUser() {
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
      <div className="w-[full] h-72 bg-gray-100 rounded-2xl">
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
      </div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>CACHORRO</Tab>
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
