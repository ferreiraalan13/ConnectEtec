import { Box } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Header from "../../components/Header";

export default function App() {
  return (
    <div className="bg-gray-300 flex flex-col gap-3">
      <Header />
      <div className="flex gap-4">
        <Box w="1100px"></Box>

        <div className="flex flex-col gap-3">
          <Evento />
          <Evento />
        </div>
      </div>
    </div>
  );
}
