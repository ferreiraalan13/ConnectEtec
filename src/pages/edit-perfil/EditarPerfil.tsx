import { Box, Stack } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import ConfigPerfil from "./AlterarFotoPerfil";
import AlterarDados from "./AlterarDados";
import AlterarSenha from "./AlterarSenha";

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
        padding={"0px"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
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
        <Box display={"flex"} ml={"10px"} mt={"10px"} gap={3}>
          <Stack gap={3} rounded={"6px"} w={"1000px"}>
            <ConfigPerfil />
            <AlterarDados />
            <AlterarSenha />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
