import { Box, Container } from "@chakra-ui/react";
import CriarPost from "../../components/CriarPost";
import DrawerExample from "../../components/DrawerExample";

export default function App() {
  return (
    <>
      <Box
        height={"100vh"}
        overflow={"hidden"}
        className={`min-lg:hidden flex bg-gray-300`}
      >
        <Box
          padding={""}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
              height: "0",
              borderRadius: "20px",
              backgroundColor: "darkgray",
              marginRight: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "20px",
            },
          }}
          width={"100%"}
        >
          <Box
            className="bg-white"
            px={1}
            h="70px"
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
            mb="10px"
            alignItems={"center"}
          >
            <div
              className={`text-black origin-left font-medium  text-2xl duration-300 p-3`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container
            h="calc(100% - 70px ) "
            overflowX={"hidden"}
            position={"relative"}
            top={0}
            zIndex={1}
            pb={5}
          >
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <CriarPost />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
