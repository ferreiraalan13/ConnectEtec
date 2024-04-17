import Post from "../../components/Post";

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
    <Box height={"100vh"} overflow={"hidden"} className="flex bg-gray-300">
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
        <DrawerExample />
        <Post />
      </Box>
    </Box>
  );
}

function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        position={"relative"}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      >
        <MenuLogo />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
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
