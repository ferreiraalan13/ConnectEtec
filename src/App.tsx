import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import HomePerfil from "./pages/home/HomePerfil";
import HomeCriarPublicacao from "./pages/home/HomeCriarPublicacao";
import Login from "./pages/login/Login";

import { RequireAuth } from "./Contexts/Auth/RequireAuth";
import HomeMobile from "./pages/home/HomeMobile";
import { useMediaQuery } from "@chakra-ui/react";
import EditarPerfil from "./pages/edit-perfil/EditarPerfil";

function App() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <RequireAuth>{isMobile ? <HomeMobile /> : <Home />}</RequireAuth>
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
          <Route
            path="/editarPerfil"
            element={
              <RequireAuth>
                <EditarPerfil />
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
