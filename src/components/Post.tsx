import { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Task } from '../types/types';

export default function Post() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('../../data/db.json');
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.id} marginLeft={''} w={''} height="fit" padding={'20px'} fontSize={'20px'}>
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Segun Adebayo" src={task.avatarImg} w={'60px'} h={'60px'} />
                <Box>
                  <Heading size="sm">{task.nameUser}</Heading>
                  <Text>{task.curso}</Text>
                </Box>
              </Flex>
              <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
            </Flex>
          </CardHeader>
          <CardBody maxH={'150px'}>
            <Text>{task.description}</Text>
          </CardBody>

          <div className="flex justify-center">
            <Image
              objectFit="cover"
              src={task.img}
              padding={'10px'}
              borderRadius={'20px'}
              maxHeight={'600px'}
              maxWidth={'600px'}
              marginLeft={'10px'}
            />
          </div>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}>
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
