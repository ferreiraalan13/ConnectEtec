import { Box, Stack } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import PostTag from "../../components/PostTag";

const PostagensFiltradas: React.FC = () => {
  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className=" bg-gray-300"
      flexDir={"row"}
    >
      <MenuFinal />

      <Box
        padding={"20px"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
            borderRadius: "20px",
            backgroundColor: "darkgray",
            marginRight: "4px",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "grey",
            borderRadius: "20px",
          },
        }}
        overflowX={"hidden"}
        width={"100%"}
      >
        <Box
          display={"flex"}
          w={"60%"}
          flexDir="column"
          justifyContent={""}
          gap={3}
        >
          <PostTag />
        </Box>
      </Box>
    </Stack>
  );
};

export default PostagensFiltradas;
