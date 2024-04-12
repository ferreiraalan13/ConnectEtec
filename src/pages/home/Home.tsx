import Post from "../../components/Post";

import { Box, Container, Flex } from "@chakra-ui/react";
import Evento from "../../components/Evento";
import Menu from "../../components/Menu";

import { ArrowLeft, Home, PocketKnife, Search } from "lucide-react";
import { useState } from "react";
import ItensMenu from "../../components/ItensMenu";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <Box height={"100vh"} overflow={"hidden"} className="flex bg-red-500">
      <div
        className={`bg-purple-400 h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <ArrowLeft
          className={`bg-white text-purple-950 rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className="inline-flex">
          <PocketKnife className="text-4xl cursor-pointer block float-left" />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            ConnectEtec
          </h1>
        </div>

        <div
          className={`flex items-center rounded-md bg-gray-700 mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <Search
            className={`text-white text-lg float-left cursor-pointer ${
              open && "mr-2"
            } `}
          />
          <input
            type="search"
            placeholder="Pesquisar"
            className={`text-base text-white bg-transparent w-full focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
      </div>

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
        <Post />
      </Box>
    </Box>
  );
}
