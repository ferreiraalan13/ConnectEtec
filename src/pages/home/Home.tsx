import Post from "../../components/Post";
import { Box } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";

export default function App() {
  return (
    <div className="flex justify-center bg-gray-300">
      <Box
        height={"100vh"}
        overflowY={"scroll"} // Mantém a funcionalidade de rolagem
        display={"flex"}
        // Utilize a propriedade CSS `::-webkit-scrollbar` para ocultar a barra de rolagem
        css={{
          "::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        <MenuFinal />

        <Box padding={"20px"} overflowX={"hidden"} width={"100%"} >
          <Box display={"flex"} justifyContent={""} gap={3}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Post />
            </Box>
            <Box>
              <Eventos />
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
