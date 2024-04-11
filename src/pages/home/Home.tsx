import Post from "../../components/Post";

import { Box, Container, Flex } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <Container
      minW={"100%"}
      p={0}
      height={"100vh"}
      overflow={"hidden"}
      display={"flex"}
    >
      <Box
        className={`bg-purple-400 h-screen p-5 pt-8 ${
          open ? "w-72" : "w-15"
        } duration-300 relative`}
      >
        <ArrowLeft
          className={`bg-white text-purple-950 rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <Menu />
      </Box>
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
        <Post />
        <Evento />
      </Box>
    </Container>
  );
}
