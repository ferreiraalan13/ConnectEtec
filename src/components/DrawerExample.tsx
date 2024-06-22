import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu as MenuLogo } from "lucide-react";
import MenuFinal from "./MenuFinal";
import { useRef } from "react";

export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} bg="transparent" onClick={onOpen}>
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
