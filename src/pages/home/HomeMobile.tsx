import { Box, Button, Container } from "@chakra-ui/react";
import DrawerExample from "../../components/DrawerExample";
import PostGeral from "../../components/PostGeral";
import { useRequestPost } from "../../services/hooks/useRequestPost";
import { CircleArrowUp } from "lucide-react";
import { useRef, useState } from "react";

export default function HomeTeste() {
  const refScroll = useRef<HTMLDivElement>(null);
  const [goInital, setGoInital] = useState<boolean>(false);

  return (
    <>
      <Box
        height={"100dvh"}
        overflow={"hidden"}
        className={`min-lg:hidden flex bg-gray-300`}
        position="relative"
      >
        <Button
          bg="#ff7461"
          w="50px"
          h="50px"
          position="absolute"
          zIndex={999}
          rounded="50%"
          p={0}
          right={4}
          bottom={goInital ? 4 : -14}
          transition={"0.4s"}
          onClick={() => {
            if (refScroll.current) {
              refScroll.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {" "}
          <CircleArrowUp color="white" size={40} />
        </Button>

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
          width={"100%"}
        >
          <Box
            className="bg-white"
            px={1}
            h="70px"
            w={"full"}
            bg={""}
            display={"flex"}
            justifyContent={"space-between"}
            position={"sticky"}
            top={0}
            zIndex={2}
            mb="10px"
            alignItems={"center"}
          >
            <div
              className={`text-black origin-left font-medium  text-2xl duration-300 p-3`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container
            h="calc(100% - 70px ) "
            overflowX={"hidden"}
            position={"relative"}
            top={0}
            zIndex={1}
            pb={5}
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
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <PostGeral useRequestPosts={useRequestPost} />
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
