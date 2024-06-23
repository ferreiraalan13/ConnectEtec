import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModelFiltrar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Stack
      h="fit-content"
      align="center"
      rounded={4}
      bg="white"
      w={"100%"}
      overflow="hidden"
    >
      <Text fontWeight="bold" fontSize="30px">
        Filtrar postagens
      </Text>
      <Stack p={10}>
        <Button
          onClick={() => {
            navigate("/postagens-filtradas", {
              state: "DESENVOLVIMENTO_DE_SISTEMAS",
            });
          }}
          w="100%"
          h="fit-content"
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
          w="350px"
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
          w="350px"
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
          w="350px"
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
          w="350px"
          h="fit-content"
        >
          Outros
        </Button>
        <Button
          onClick={() => {
            navigate("/postagens-seguindo");
          }}
          w="350px"
          h="fit-content"
        >
          Seguindo
        </Button>
      </Stack>
    </Stack>
  );
};

export default ModelFiltrar;
