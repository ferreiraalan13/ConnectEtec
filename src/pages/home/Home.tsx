import Post from "../../components/Post";

import { Box, Stack } from "@chakra-ui/react";

import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";

export default function App() {
  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className="flex bg-gray-300"
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
        <Box display={"flex"} justifyContent={""} gap={3}>
          <Stack w={"1000px"}>
            <Post />
          </Stack>

          <Box>
            <Eventos />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
