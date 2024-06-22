import React from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRequestGetEventos } from "../services/hooks/useRequestGetEventos";

const Eventos: React.FC = () => {
  const { data } = useRequestGetEventos();

  return (
    <Box
      mt={5}
      padding="10px"
      bg="white"
      rounded="6px"
      w="350px"
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
  );
};

export default Eventos;
