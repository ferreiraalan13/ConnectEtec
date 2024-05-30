import { Avatar, Stack, Text } from "@chakra-ui/react";

const Comentario: React.FC = () => {
  return (
    <Stack p={3} borderRadius="4px" boxShadow="2px 2px 2px 2px rgba(0,0,0,0.2)">
      <Stack flexDir="row" align="center">
        <Avatar name="Alan Ferreira" />
        <Text>Alan Ferreira</Text>
      </Stack>
      <Stack p={3}>
        <Text>aspiokdjkpioasdkpoasdkopaskopdkpaosdkpoasdkopaskopdkop</Text>
      </Stack>
    </Stack>
  );
};

export default Comentario;
