import { Box, Container } from "@chakra-ui/react";

import DrawerExample from "../../components/DrawerExample";
import CriarEvento from "../../components/CriarEvento";

export default function PageCriarEventoMobile() {
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
          overflowX={"hidden"}
          width={"100%"}
        >
          <Box
            className="bg-gray-300"
            p={1}
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
          >
            <div
              className={`text-black origin-left font-medium text-2xl duration-300 p-1`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container position={"relative"} top={0} zIndex={1}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <CriarEvento />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
