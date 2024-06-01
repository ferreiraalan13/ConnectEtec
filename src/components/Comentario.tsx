import { Avatar, Box, Stack, Text } from "@chakra-ui/react";

const Comentario: React.FC = () => {
  return (
    <Stack p={3} borderRadius="4px" boxShadow="2px 2px 2px 2px rgba(0,0,0,0.2)">
      <Stack flexDir="row" align="center">
        <Avatar name="Alan Ferreira" />
        <Box>
          <Text>Alan Ferreira </Text>
          <Text fontSize="14px">31/05/2024 - 21:20</Text>
        </Box>
      </Stack>
      <Stack p={3}>
        <Text>aspiokdjkpioasdkpoasdkopaskopdkpaosdkpoasdkopaskopdkop</Text>
      </Stack>
    </Stack>
  );
};

export default Comentario;
