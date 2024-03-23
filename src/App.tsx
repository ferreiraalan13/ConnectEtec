import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './pages/main/Main';
import SignUp from './pages/sign-up/SignUp';


function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<SignUp/>}  ></Route>
            <Route path='/main' element={<Main/>} ></Route>
          </Routes>
        </Router>
    </div>
  );
}


export default App;