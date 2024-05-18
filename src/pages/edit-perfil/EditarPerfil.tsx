import { Box, Container } from "@chakra-ui/react";

import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";
import ConfigPerfil from "./AlterarFotoPerfil";
import AlterarDados from "./AlterarDados";

export default function App() {
  return (
    <Box
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className="flex bg-gray-300"
    >
      <MenuFinal />

      <Box
        padding={"20px"}
        css={{
          "&::-webkit-scrollbar": {
            width: "13px",
            height: "13px",
            borderRadius: "20px",
            backgroundColor: "darkgray",
            marginRight: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "20px",
          },
        }}
        overflowX={"hidden"}
        width={"100%"}
      >
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            rounded={"6px"}
            bg={"white"}
            w={"600px"}
          >
            <Container p="5" display={"flex"} flexDirection={"column"} gap={10}>
              <ConfigPerfil />
              <AlterarDados />
            </Container>
          </Box>

          <Box>
            <Eventos />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
