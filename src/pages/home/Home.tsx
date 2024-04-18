import Post from "../../components/Post";

import { Box, Container, Flex } from "@chakra-ui/react";
import Evento from "../../components/Evento";

import { useContext } from "react";

import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";

export default function App() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <Box
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className="flex bg-gray-300"
    >
      <MenuFinal />

      <Box
        padding={"20px"}
        css={{
          "&::-webkit-scrollbar": {
            width: "13px",
            height: "13px",
            borderRadius: "20px",
            backgroundColor: "darkgray",
            marginRight: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "20px",
          },
        }}
        overflowX={"hidden"}
        width={"100%"}
      >
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box display={"flex"} flexDirection={"column"} gap={3}>
            <Post />
          </Box>
          <Box>
            <Eventos />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
