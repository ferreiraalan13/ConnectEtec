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
import Post from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

interface PerfilData {
  nomeCompleto: string;
  nomeSocial: string;
  nomeUsuario: string;
  urlFotoPerfil: string;
  sobre: string;
}

export default function Perfil() {
  const [perfilData, setPerfilData] = useState<PerfilData | null>(null);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("authToken")}`;

  useEffect(() => {
    axios
      .get("http://localhost:8080/perfilUsuario/buscarMeuPerfil")
      .then((response) => {
        setPerfilData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);
      });
  }, []);

  return (
    <Box
      className="flex flex-col gap-5"
      bg="white"
      w="800px"
      h=""
      padding="10px"
      borderRadius={"16px"}
      marginLeft={""}
    >
      <div className="w-[780px] h-72 bg-gray-100 rounded-2xl">
        <div className="w-full h-36">
          <img
            src={Banner}
            alt=""
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="px-5 -translate-y-16 flex items-end">
            <Avatar src={perfilData?.urlFotoPerfil} w={150} h={150} />
            <Text fontSize="2xl">{perfilData?.nomeCompleto}</Text>
          </div>
        </div>
      </div>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Postagens</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <h1 className="">Bibliografia</h1>
              <h2>{perfilData?.sobre}</h2>
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
