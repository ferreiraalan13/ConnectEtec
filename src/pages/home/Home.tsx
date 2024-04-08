import Post from "../../components/Post";

import { Box } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";

export default function App() {
  return (
    <div className="bg-gray-300 flex flex-col gap-3 p-2">
      <div className="flex gap-4">
        <Menu />

        <Box className="flex gap-3 justify-center" w="1100px">
          <Box
            marginLeft={"315px"}
            w={"800px"}
            className="flex flex-col gap-3 "
          >
            <Post />
          </Box>
        </Box>

        <div className="flex flex-col gap-3">
          <Evento />
          <Evento />
          
        </div>
      </div>
    </div> 
  );
}
