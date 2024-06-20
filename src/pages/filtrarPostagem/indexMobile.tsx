import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DrawerExample from "../../components/DrawerExample";

const FiltrarPostagemMobile: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        height={"100vh"}
        overflow={"hidden"}
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
          overflowX={"hidden"}
          width={"100%"}
        >
          <Box
            className="bg-gray-300"
            p={1}
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
          >
            <div
              className={`text-black origin-left font-medium text-2xl duration-300 p-1`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container position={"relative"} top={0} zIndex={1}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Stack
                py={30}
                align="center"
                rounded={4}
                h="95vh"
                minH="600px"
                bg="white"
                w={"100%"}
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
                  w="250px"
                >
                  Desenvolvimento de Sitemas
                </Button>
                <Button
                  onClick={() => {
                    navigate("/postagens-filtradas", {
                      state: "RECURSOS_HUMANOS",
                    });
                  }}
                  w="250px"
                >
                  Recursos Humanos
                </Button>
                <Button
                  onClick={() => {
                    navigate("/postagens-filtradas", {
                      state: "CONTABILIDADE",
                    });
                  }}
                  w="250px"
                >
                  Contabilidade
                </Button>
                <Button
                  onClick={() => {
                    navigate("/postagens-filtradas", {
                      state: "SEGURANCA_DO_TRABALHO",
                    });
                  }}
                  w="250px"
                >
                  Segurança do Trabalho
                </Button>
                <Button
                  onClick={() => {
                    navigate("/postagens-filtradas", {
                      state: "NOTICIA",
                    });
                  }}
                  w="250px"
                >
                  Noticia
                </Button>
                <Button
                  onClick={() => {
                    navigate("/postagens-filtradas", {
                      state: "OUTRO",
                    });
                  }}
                  w="250px"
                >
                  Outros
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default FiltrarPostagemMobile;
