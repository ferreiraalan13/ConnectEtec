import { Box, Button, Stack, Text } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
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
          <Stack
            py={30}
            align="center"
            rounded={4}
            h="95vh"
            minH="600px"
            bg="white"
            w={"60%"}
          >
            <Text fontWeight="bold" fontSize="30px" mb={5}>
              Filtrar postagens
            </Text>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "DESENVOLVIMENTO_DE_SISTEMAS",
                });
              }}
              w="350px"
            >
              Desenvolvimento de Sitemas
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "RECURSOS_HUMANOS",
                });
              }}
              w="350px"
            >
              Recursos Humanos
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "CONTABILIDADE",
                });
              }}
              w="350px"
            >
              Contabilidade
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "SEGURANCA_DO_TRABALHO",
                });
              }}
              w="350px"
            >
              Segurança do Trabalho
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "NOTICIA",
                });
              }}
              w="350px"
            >
              Noticia
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-filtradas", {
                  state: "OUTRO",
                });
              }}
              w="350px"
            >
              Outros
            </Button>
            <Button
              onClick={() => {
                navigate("/postagens-seguindo");
              }}
              w="350px"
            >
              Seguindo
            </Button>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default FiltrarPostagem;
