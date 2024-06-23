import { Box, Container } from "@chakra-ui/react";

import DrawerExample from "../../components/DrawerExample";
import ConfigPerfil from "../edit-perfil/AlterarFotoPerfil";
import AlterarDados from "../edit-perfil/AlterarDados";
import AlterarSenha from "./AlterarSenha";

export default function EditarPerfilMobile() {
  return (
    <>
      <Box
        height={"100vh"}
        overflow={"auto"}
        className={`min-lg:hidden flex bg-gray-300`}
      >
        <Box
          padding={""}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
              height: "0",
              borderRadius: "20px",
              backgroundColor: "darkgray",
              marginRight: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "20px",
            },
          }}
          width={"100%"}
        >
          <Box
            className="bg-white"
            px={1}
            h="70px"
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
            mb="10px"
            alignItems={"center"}
          >
            <div
              className={`text-black origin-left font-medium  text-2xl duration-300 p-3`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container position={"relative"} top={0} zIndex={1}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <ConfigPerfil />
              <AlterarDados />
              <AlterarSenha />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
