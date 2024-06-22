import { Flex, Stack } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";
import { useRequestPost } from "../../services/hooks/useRequestPost";
import PostGeral from "../../components/PostGeral";
import ModelFiltrar from "../filtrarPostagem/ModelFiltrar";

export default function App() {
  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className=" bg-gray-300"
      flexDir={"row"}
    >
      <MenuFinal />

      <Flex overflow="auto" w="100%" py="20px" pr="20px">
        <Stack
          px={"20px"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
              height: "0",
              borderRadius: "20px",
              backgroundColor: "darkgray",
              marginRight: "4px",
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "20px",
            },
          }}
          width={"75%"}
        >
          <PostGeral useRequestPosts={useRequestPost} />
        </Stack>

        <Stack w={"25%"}>
          <Eventos />
          <ModelFiltrar />
        </Stack>
      </Flex>
    </Stack>
  );
}
