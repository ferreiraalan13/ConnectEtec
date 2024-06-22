import { Box, Image, Stack, Container, Text } from "@chakra-ui/react";
import { useRequestGetEventos } from "../../services/hooks/useRequestGetEventos";
import { Carousel } from "react-responsive-carousel";
import DrawerExample from "../../components/DrawerExample";

const EventosProximos: React.FC = () => {
  const { data } = useRequestGetEventos();
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
            zIndex={2}
          >
            <div
              className={`text-black origin-left font-medium text-2xl duration-300 p-1`}
            >
              {" "}
              ConnectEtec
            </div>
            <DrawerExample />
          </Box>

          <Container position={"relative"} top={0} zIndex={1}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Stack align="center" rounded={4} bg="white" w={"100%"}>
                <Text fontSize="23px" mt={10}>
                  Eventos
                </Text>
                <Box
                  mt={5}
                  padding="10px"
                  bg="white"
                  rounded="6px"
                  w="fit-content"
                  h="fit-content"
                >
                  {data && (
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      useKeyboardArrows
                      autoPlay
                      interval={5000}
                    >
                      {data?.map((evento) => (
                        <Stack>
                          <Image src={evento.urlMidia} alt="Evento 1" />
                        </Stack>
                      ))}
                    </Carousel>
                  )}
                </Box>
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default EventosProximos;
