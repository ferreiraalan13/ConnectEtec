import React from "react";
import { Box, Image, Stack } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Eventos: React.FC = () => {
  return (
    <Box padding="10px" bg="white" rounded="6px" w="450px">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={5000}
      >
        <Stack>
          <Image
            src="../../src/assets/img/festajunina.png"
            alt="Festa Junina"
          />
        </Stack>
        <Stack>
          <Image
            w="100%"
            h="100%"
            src="https://firebasestorage.googleapis.com/v0/b/connectetec-6e89c.appspot.com/o/imagens%2Fpublicacao%2F1718313948260_giraffa.jfif?alt=media&token=18d5af90-da32-4706-9d8a-30e4cff0aca7"
            alt="Evento 1"
          />
        </Stack>
        <Stack>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/connectetec-6e89c.appspot.com/o/imagens%2Fpublicacao%2F1717884636527_hq720.jpg?alt=media&token=cb4310d1-18dc-451d-8b25-96c99f3b43ca"
            alt="Evento 2"
          />
        </Stack>
        {/* Adicione mais imagens conforme necessário */}
      </Carousel>
    </Box>
  );
};

export default Eventos;
