import {
  Box,
  Button,
  Textarea,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import userImage from "../assets/img/1702865313114.jpeg";
import { Image } from "lucide-react";

export default function CriarPost() {
  return (
    <form action="">
      <Box
        className="flex flex-col gap-5"
        bg="white"
        w="800px"
        h="500px"
        padding="10px"
        borderRadius={"16px"}
        marginLeft={""}
      >
        <div className="flex justify-center gap font-bold text-2xl">
          Criar Publicação
        </div>

        <div className="flex gap-2 flex-col w-full">
          <div className="flex bg-gray-300 text-gray-700 items-center gap-3 p-2 rounded-lg h-{78px} ">
            <img
              className="w-[50px] rounded-full bg-gray-300"
              src={userImage}
              alt=""
            />
            Fulano <span className="text-gray-500">@Fulano</span>
          </div>
        </div>

        <Textarea placeholder="O que voce esta pensando?" required />

        <InputGroup>
          <InputLeftAddon>{<Image />}</InputLeftAddon>
          <Input type="file" p={1} />
        </InputGroup>

        <Button colorScheme="teal" variant="solid" type="submit">
          Publicar
        </Button>
      </Box>
    </form>
  );
}
