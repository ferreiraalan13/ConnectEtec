import { Box } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import CriarEvento from "../../components/CriarEvento";

export default function PageEventoCriar() {
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
        <CriarEvento />
      </Box>
    </Box>
  );
}
