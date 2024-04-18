import { Box } from "@chakra-ui/react";
import CriarPost from "../../components/CriarPost";
import MenuFinal from "../../components/MenuFinal";

export default function App() {
  return (
    <Box height={"100vh"} overflow={"hidden"} className="flex bg-gray-300">
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
        <CriarPost />
      </Box>
    </Box>
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
