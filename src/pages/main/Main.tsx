
import Post from '../../components/Post';

import { SimpleGrid } from '@chakra-ui/react';
import Evento from '../../components/Evento';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

export default function App() {

  
  return (
    <div className='bg-gray-300 flex flex-col gap-3' >
      <Header/>
      <div className='flex gap-4'>
        <Menu/>

        <SimpleGrid width={"800px"}>
          <Post/>
          <Post/>
          <Post/>
        </SimpleGrid>
        
        <div className='flex flex-col gap-3'>
          <Evento/>
          <Evento/> 
        </div>
           
      </div>
      
    </div>
    
  );
}
