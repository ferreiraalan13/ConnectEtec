import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModelFiltrar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack h="350px" align="center" rounded={4} bg="white" w={"350px"}>
      <Text fontWeight="bold" fontSize="30px" mb={5}>
        Filtrar postagens
      </Text>
      <Stack p={10} overflow="auto">
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
    </Stack>
  );
};

export default ModelFiltrar;
