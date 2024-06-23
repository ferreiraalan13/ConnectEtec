import { Button, Flex, Stack } from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import Eventos from "../../components/Evento";
import { useRequestPost } from "../../services/hooks/useRequestPost";
import PostGeral from "../../components/PostGeral";
import ModelFiltrar from "../filtrarPostagem/ModelFiltrar";
import { useRef, useState } from "react";
import { CircleArrowUp } from "lucide-react";

export default function App() {
  const refScroll = useRef<HTMLDivElement>(null);
  const [goInital, setGoInital] = useState<boolean>(false);
  return (
    <Stack
      height={"100dvh"}
      overflow={"hidden"}
      gap={0}
      className=" bg-gray-300"
      flexDir={"row"}
      position="relative"
    >
      <Button
        bottom={goInital ? 4 : -20}
        right={8}
        w="60px"
        h="60px"
        rounded="50%"
        zIndex={999}
        position="absolute"
        bg="#ff7461"
        p={0}
        transition={"0.4s"}
        onClick={() => {
          if (refScroll.current) {
            refScroll.current.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <CircleArrowUp color="white" size={40} />
      </Button>
      <MenuFinal />

      <Flex
        overflow="auto"
        w="100%"
        py="20px"
        pr="20px"
        ref={refScroll}
        onScroll={(scroll) => {
          if (scroll.currentTarget.scrollTop >= 600) {
            if (!goInital) {
              setGoInital(true);
            }
          } else {
            if (goInital) {
              setGoInital(false);
            }
          }
        }}
      >
        <Stack
          px={"20px"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0",
              height: "0",
              borderRadius: "20px",
              backgroundColor: "darkgray",
              marginRight: "4px",
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "grey",
              borderRadius: "20px",
            },
          }}
          width={"75%"}
        >
          <PostGeral useRequestPosts={useRequestPost} />
        </Stack>

        <Stack w={"25%"}>
          <Eventos />
          <ModelFiltrar />
        </Stack>
      </Flex>
    </Stack>
  );
}
