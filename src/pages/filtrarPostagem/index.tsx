import { Box, Button, Stack } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";
import { useNavigate } from "react-router-dom";

const FiltrarPostagem: React.FC = () => {
  const navigate = useNavigate();
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
        <Box display={"flex"} justifyContent={""} gap={3}>
          <Stack p={50} rounded={4} h="95vh" minH="600px" bg="white" w={"60%"}>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "DESENVOLVIMENTO_DE_SISTEMAS",
                });
              }}
              w="300px"
            >
              Desenvolvimento de Sitemas
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "RECURSOS_HUMANOS",
                });
              }}
              w="300px"
            >
              Recursos Humanos
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "CONTABILIDADE",
                });
              }}
              w="300px"
            >
              Contabilidade
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "SEGURANCA_DO_TRABALHO",
                });
              }}
              w="300px"
            >
              Segurança do Trabalho
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "NOTICIA",
                });
              }}
              w="300px"
            >
              Noticia
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "OUTRO",
                });
              }}
              w="300px"
            >
              Outros
            </Button>
          </Stack>

          <Box>
            <Eventos />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default FiltrarPostagem;
