import {
  Avatar,
  Box,
  Button,
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
        <Box display={"flex"} justifyContent={""} gap={1}>
          <Stack w={"60%"}>
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
                  data.map((result) => (
                    <Stack
                      key={result.login}
                      w={"80%"}
                      h="fit-content"
                      bg="#ff7461"
                      borderRadius={"20px"}
                      align={"center"}
                      flexDir="row"
                      justifyContent={"space-between"}
                      p={3}
                    >
                      <Flex align="center">
                        <Avatar
                          cursor="pointer"
                          onClick={() => {
                            navigate("/perfil-usuario", {
                              state: result.login,
                            });
                          }}
                          src={result.urlFotoPerfil}
                        />
                        <Text fontSize="18px" ml={2}>
                          {result.nomePerfilUsuario}
                        </Text>
                      </Flex>
                      <Text>
                        {result.estaSeguido ? "Seguindo" : "Não seguido"}
                      </Text>
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
