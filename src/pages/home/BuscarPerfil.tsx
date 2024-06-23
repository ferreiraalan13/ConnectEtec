import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import MenuFinal from "../../components/MenuFinal";
import { Search } from "lucide-react";
import { useRequestSearchUser } from "../../services/hooks/useRequestSearchUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [nome, setNome] = useState("");
  const { data, refetch } = useRequestSearchUser(nome);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <Stack
      height={"100vh"}
      overflow={"hidden"}
      gap={0}
      className="bg-gray-300"
      flexDir={"row"}
    >
      <MenuFinal />

      <Box
        padding={"20px"}
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
        overflowX={"hidden"}
        width={"100%"}
      >
        <Box display={"flex"} gap={1}>
          <Stack w={"60%"}>
            <form onSubmit={handleSubmit}>
              <Stack
                id="boxImage"
                flexDir={"column"}
                bg="white"
                gap={4}
                w="80%"
                maxW="1000px"
                padding="10px"
                borderRadius={"20px"}
                marginLeft={""}
                align={"center"}
              >
                <Text fontWeight={"bold"} fontSize="30px">
                  BUSCAR PERFIL
                </Text>
                <Stack
                  w="100%"
                  flexDir={"row"}
                  justify="center"
                  borderRadius={4}
                  boxShadow={"rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"}
                >
                  <Input
                    _focus={{
                      boxShadow: "none",
                    }}
                    border="none"
                    borderRadius={10}
                    bg="white"
                    placeholder="Buscar Usuario"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <Button type="submit">
                    <Search />
                  </Button>
                </Stack>
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
                          {result.estaSeguido ? "Seguindo" : "Não seguido"}
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
    </Stack>
  );
}
