import { Stack, Text } from "@chakra-ui/react";

const ListaGrupos: React.FC = () => {
  return (
    <Stack>
      <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"}>
        GRUPOS
      </Text>
      <Text>Desenvolvimento de Sistemas</Text>
      <Text>Recursos Humanos</Text>
      <Text>Contabilidade</Text>
      <Text>Administração</Text>
    </Stack>
  );
};

export default ListaGrupos;
