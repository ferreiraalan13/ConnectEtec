import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Text,
  Image,
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ThumbsUp, MessageSquare, Ellipsis, Trash2 } from "lucide-react";
import { Task } from "../types/types";

export default function Post() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("../../data/db.json");
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <Card
          key={task.id}
          marginLeft={""}
          w={"full"}
          alignItems={"left"}
          padding={"0"}
        >
          <CardHeader w={"full"} fontSize={"sm"}>
            <Flex>
              <Flex flex="1" gap="1" alignItems="stretch">
                <Avatar src={task.avatarImg} w={"60px"} h={"60px"} />
                <Box>
                  <Heading size="sm">{task.nameUser}</Heading>
                  <Text fontSize={"small"}>{task.curso}</Text>
                </Box>
              </Flex>

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<Ellipsis />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem icon={<Trash2 />}>Excluir Postagem</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </CardHeader>
          <CardBody maxH={"120px"} maxW={"600px"} fontSize={"small"} pt={0}>
            <Text fontSize={{ sm: "10px", md: "15px" }}>
              {task.description}
            </Text>
          </CardBody>

          <div className="flex justify-center m-0">
            <Image
              flexWrap={"wrap"}
              objectFit="cover"
              src={task.img}
              padding={"5px"}
              marginTop={"30px"}
              borderRadius={"20px"}
              maxHeight={"250px"}
              maxWidth={"250px"}
              marginLeft={"10px"}
            />
          </div>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "",
              },
            }}
          >
            <Button flex="1" variant="ghost">
              <ThumbsUp />
            </Button>
            <Button flex="1" variant="ghost">
              <MessageSquare />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
