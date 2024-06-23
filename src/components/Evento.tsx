import React from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRequestGetEventos } from "../services/hooks/useRequestGetEventos";

const Eventos: React.FC = () => {
  const { data } = useRequestGetEventos();

  if (!data) return;
  return (
    <Box padding="10px" bg="white" rounded="6px" w="100%" h="fit-content">
      {data && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          autoPlay
          interval={5000}
        >
          {data?.map((evento, index) => (
            <Stack key={index} h="100%">
              <Image
                objectFit="cover"
                h="100%"
                src={evento.urlMidia}
                alt="Evento 1"
              />
            </Stack>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default Eventos;
