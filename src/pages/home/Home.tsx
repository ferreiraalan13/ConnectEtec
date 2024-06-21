import { Box, Stack } from "@chakra-ui/react";
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

      <Box
        padding={"20px"}
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
        overflowX={"hidden"}
        width={"100%"}
      >
        <Box display={"flex"} gap={3}>
          <Stack align="center" w={"100%"}>
            <PostGeral useRequestPosts={useRequestPost} />
          </Stack>
        </Box>
      </Box>

      <Stack mr={100} w={"20%"}>
        <Eventos />
        <ModelFiltrar />
      </Stack>
    </Stack>
  );
}
