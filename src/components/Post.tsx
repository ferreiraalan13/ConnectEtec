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
} from "@chakra-ui/react";

import userImage from "../assets/img/1702865313114.jpeg";
import { useEffect, useState } from "react";



const Post: React.FC=()=> {


  const [tasks, setTasks] = useState([]);
    useEffect(()=>{
      fetch('../../db.json',{
        headers:{
          Accept:"application/json"
        }
      }).then(res => res.json())
        .then(res => setTasks(res.data))
    },[]);


  return (
      
      <Card w={"800px"} height="fit" padding={"20px"} fontSize={"20px"}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name="Segun Adebayo"
                src={userImage}
                w={"60px"}
                h={"60px"}
                
              />
              
              <Box>
                <Heading size="sm">{}</Heading>
                <Text>Desenvolvimento de Sistemas</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody maxH={"150px"}>
          <Text>
            With Chakra UI, I wanted to sync the speed of development with the
            speed of design. I wanted the developer to be just as excited as the
            designer to create a screen.
          </Text>
        </CardBody>

        <div className="flex justify-center">
          <Image
            objectFit="cover"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Chakra UI"
            padding={"10px"}
            borderRadius={"20px"}
            maxHeight={"600px"}
            maxWidth={"600px"}
            marginLeft={"10px"}
          />
        </div>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" >
            Like
          </Button>
          <Button flex="1" variant="ghost">
            Comment
          </Button>
          <Button flex="1" variant="ghost">
            Share
          </Button>
        </CardFooter>
      </Card>
    
  );
}

export default Post