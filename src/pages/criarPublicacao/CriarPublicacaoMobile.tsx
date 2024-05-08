import { Box, Button, Container, Drawer, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import CriarPost from "../../components/CriarPost";
import MenuFinal from "../../components/MenuFinal";
import { Menu as MenuLogo } from "lucide-react";
import { useRef } from "react";

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
            zIndex={2} // Ajuste o z-index para garantir que o DrawerExample fique sobreposto
          >
            <div
              className={`text-black origin-left font-medium text-2xl duration-300 p-1`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container // Envolve o Post e DrawerExample em um contêiner
            position={"relative"} // Posição relativa para garantir que o DrawerExample seja fixado corretamente
            top={0}
            zIndex={1} // Z-index menor para garantir que o conteúdo do Post fique abaixo do DrawerExample
          >
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <CriarPost/>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <MenuLogo />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <MenuFinal />
        </DrawerContent>
      </Drawer>
    </>
  );
}