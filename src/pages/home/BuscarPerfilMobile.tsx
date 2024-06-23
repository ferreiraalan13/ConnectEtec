import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import DrawerExample from "../../components/DrawerExample";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRequestSearchUser } from "../../services/hooks/useRequestSearchUser";
import { useNavigate } from "react-router-dom";

export default function BuscarPerfilMobile() {
  const [nome, setNome] = useState("");
  const { data, refetch } = useRequestSearchUser(nome);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <Box
        height={"100vh"}
        overflow={"auto"}
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

          <Container position={"relative"} top={0} zIndex={1}>
            <Box display={"flex"} flexDirection={"column"} gap={3}>
              <Box display={"flex"} justifyContent={""} gap={1}>
                <Stack w={"100%"}>
                  <form onSubmit={handleSubmit}>
                    <Stack flexDir={"row"}>
                      <Input
                        borderRadius={10}
                        bg="white"
                        placeholder="Buscar Usuario"
                        mb={5}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                      <Button type="submit">
                        <Search />
                      </Button>
                    </Stack>

                    <Stack
                      id="boxImage"
                      flexDir={"column"}
                      gap={10}
                      bg="white"
                      maxW="1000px"
                      minH="700px"
                      padding="10px"
                      borderRadius={"20px"}
                      marginLeft={""}
                      align={"center"}
                    >
                      <Text fontWeight={"bold"} fontSize="30px">
                        BUSCAR PERFIL
                      </Text>
                      {data &&
                        data.length > 0 &&
                        data.map((result, index) => (
                          <Stack w="100%" key={index}>
                            <Stack
                              py={1}
                              w={"100%"}
                              h="fit-content"
                              align={"center"}
                              flexDir="row"
                              justifyContent={"space-between"}
                              px={3}
                            >
                              <Flex align="center">
                                <Avatar
                                  w="60px"
                                  h="60px"
                                  cursor="pointer"
                                  onClick={() => {
                                    navigate("/perfil-usuario", {
                                      state: result.login,
                                    });
                                  }}
                                  src={result.urlFotoPerfil}
                                />
                                <Text ml={5} fontWeight="semi-bold">
                                  {result.nomePerfilUsuario}
                                </Text>
                              </Flex>
                              <Text>
                                {result.estaSeguido
                                  ? "Seguindo"
                                  : "Não seguido"}
                              </Text>
                            </Stack>
                            {index !== data.length - 1 && <Divider />}
                          </Stack>
                        ))}
                    </Stack>
                  </form>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
