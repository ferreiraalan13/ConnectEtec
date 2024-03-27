
import Post from '../../components/Post';

import { Box, SimpleGrid } from '@chakra-ui/react';
import Evento from '../../components/Evento';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import CriarPost from '../../components/CriarPost';

export default function App() {


  
  return (
    <div className='bg-gray-300 flex flex-col gap-3 p-2' >
      
      <div className='flex gap-4'>
        
          <Menu/>
        
        

        <Box className='flex gap-3 justify-center' w="1100px">
          <div className='flex flex-col gap-3 '>
            <CriarPost/>

          </div>
          
          
          
          
          
        </Box>
        
        <div className='flex flex-col gap-3'>
          <Evento/>
          <Evento/> 
        </div>
           
      </div>
      
    </div>
    
  );
}
