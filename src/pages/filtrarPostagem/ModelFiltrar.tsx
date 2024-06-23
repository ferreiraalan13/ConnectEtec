import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModelFiltrar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack h="fit-content" align="center" rounded={4} bg="white" w={"100%"}>
      <Text px={5} fontWeight="bold" fontSize="26px" textAlign="center">
        Filtrar postagens
      </Text>
      <Stack w="100%" px={2} py={2}>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "DESENVOLVIMENTO_DE_SISTEMAS",
            });
          }}
          w="100%"
          h="fit-content"
          whiteSpace="break-spaces"
        >
          Desenvolvimento de Sitemas
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "RECURSOS_HUMANOS",
            });
          }}
          w="100%"
          h="fit-content"
        >
          Recursos Humanos
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "CONTABILIDADE",
            });
          }}
          w="100%"
          h="fit-content"
        >
          Contabilidade
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "SEGURANCA_DO_TRABALHO",
            });
          }}
          w="100%"
          h="fit-content"
        >
          Segurança do Trabalho
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "NOTICIA",
            });
          }}
          w="100%"
          h="fit-content"
        >
          Noticia
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "OUTRO",
            });
          }}
          w="100%"
          h="fit-content"
        >
          Outros
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-seguindo");
          }}
          w="100%"
          h="fit-content"
        >
          Seguindo
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModelFiltrar;
