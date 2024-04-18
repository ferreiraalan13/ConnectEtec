import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Banner from "../assets/Background.svg";
import meninolindo from "../assets/img/1702865313114.jpeg";
import Post from "./Post";

export default function Perfil() {
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
            <img src={meninolindo} alt="" className="rounded-full w-32 h-32 " />
            <h1>Fulano da Silva Souza</h1>
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
              <h2>
                Ola, meu nome é Alan, sou aluno de desenvolvimento de sistemas
                da Etec jardim angela. =D
              </h2>
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
