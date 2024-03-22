
/*

import Header from './components/Header';
import Menu from './components/Menu';
import Post from './components/Post';
*/

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Post from '../../components/Post';

function App() {
  return (
    <div className='bg-gray-300 flex flex-col gap-3' >
      <Header/>
      <div className='flex gap-4'>
        <Menu/>
        <div className='flex flex-col gap-3'>
          <Post/>
          <Post/>
          <Post/>
        </div>
        
      </div>
      
    </div>
    
  );
}

export default App;