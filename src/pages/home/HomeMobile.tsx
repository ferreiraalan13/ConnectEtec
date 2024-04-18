import Post from "../../components/Post";

import logoConnect from "../../assets/img/logoConnect.png";

import { Menu as MenuLogo } from "lucide-react";

import MenuTeste from "../../components/Menu";

import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Evento from "../../components/Evento";

import React, { useContext, useRef } from "react";

import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import MenuFinal from "../../components/MenuFinal";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function HomeTeste() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

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
              <Post />
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
          <MenuTeste />
        </DrawerContent>
      </Drawer>
    </>
  );
}
