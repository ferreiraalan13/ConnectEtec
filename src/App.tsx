import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import SignUp from './pages/sign-up/SignUp';
import HomePerfil from './pages/home/HomePerfil';
import HomeCriarPublicacao from './pages/home/HomeCriarPublicacao'
import Login from './pages/login/Login';



function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}  ></Route>
            <Route path='/home' index element={<Home/>}></Route>
            <Route path='/criarPublicacao' index element={<HomeCriarPublicacao/>}></Route>
            <Route path='/homePerfil' index element={<HomePerfil/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}


export default App;