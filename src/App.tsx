import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import HomePerfil from "./pages/home/HomePerfil";
import HomeCriarPublicacao from "./pages/home/HomeCriarPublicacao";
import Login from "./pages/login/Login";

import { RequireAuth } from "./Contexts/Auth/RequireAuth";
import HomeTeste from "./pages/home/HomeTeste";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/homeTeste"
            element={
              <RequireAuth>
                <HomeTeste />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/criarPublicacao"
            element={
              <RequireAuth>
                <HomeCriarPublicacao />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/homePerfil"
            element={
              <RequireAuth>
                <HomePerfil />
              </RequireAuth>
            }
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
