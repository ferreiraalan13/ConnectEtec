import { Box, Flex } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";
import CriarPost from "../../components/CriarPost";

export default function App() {
  return (
    <Flex flexDirection={"column"} gap={3} padding={2} className="bg-gray-300">
        <div>
        <Menu />
        </div>
        

        <Box className="flex gap-3 justify-center" marginLeft={'150px'} w="1100px">
          <div className="flex flex-col gap-3 ">
            <CriarPost />
          </div>
          <div className="flex flex-col gap-3">
          <Evento />
          <Evento />
        </div>

        </Box>

        
      
    </Flex>
  );
}

/* 
<Flex flexDirection={"column"} gap={3} padding={2} className="bg-gray-300">
<div>
<Menu />
</div>

<Box className="flex gap-3 justify-center" w="1100px">
<Box marginLeft={"460px"} w={"800px"} className="flex flex-col gap-3 ">
  <Post />
</Box>
<div className="flex flex-col gap-3">
  <Evento />
  <Evento />
</div>
</Box>
</Flex> */
