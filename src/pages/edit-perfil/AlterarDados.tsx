import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";

const AlterarDados: React.FC = () => {
  return (
    <Stack p="5" border={"1px solid"} borderRadius={"4"} display={"flex"}>
      <Stack as="form" w="80%">
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
      </Stack>
    </Stack>
  );
};
export default AlterarDados;
