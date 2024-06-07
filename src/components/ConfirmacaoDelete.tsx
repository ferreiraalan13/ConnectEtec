import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import React, { ReactNode, RefObject } from "react";

interface IOwnProps {
  children: ReactNode;
}

const AlertDialogExample: React.FC<IOwnProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: RefObject<HTMLButtonElement> =
    React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuItem onClick={onOpen} icon={<Trash2 />}>
        Excluir Postagem
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir postagem
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Você não poderá desfazer essa ação.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>

              {children}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogExample;
