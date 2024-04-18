import { Box } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";
import Perfil from "../../components/Perfil";
import MenuFinal from "../../components/MenuFinal";

export default function HomePerfil() {
  return (
    <Box height={"100vh"} overflow={"hidden"} className="flex bg-gray-300">
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
        <Perfil />
      </Box>
    </Box>
  );
}
