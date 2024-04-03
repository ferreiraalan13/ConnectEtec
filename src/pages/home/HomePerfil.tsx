import { Box } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";
import Perfil from "../../components/Perfil";

export default function HomePerfil() {
  return (
    <div className="bg-gray-300 flex flex-col gap-3 p-2">
      <div className="flex gap-4">
        <Menu />

        <Box className="flex gap-3 justify-center" w="1100px">
          <div className="flex flex-col gap-3 ">
            <Perfil />
          </div>
        </Box>

        <div className="flex flex-col gap-3">
          <Evento />
          <Evento />
        </div>
      </div>
    </div>
  );
}
