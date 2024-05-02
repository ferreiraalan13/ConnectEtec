import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import HomePerfil from "./pages/home/HomePerfil";
import HomeCriarPublicacao from "./pages/home/HomeCriarPublicacao";
import Login from "./pages/login/Login";
import { Spinner, useMediaQuery } from "@chakra-ui/react";
import EditarPerfil from "./pages/edit-perfil/EditarPerfil";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import { ProtectedRoute } from "./components/protectedRoute";

function App() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/criarPublicacao"
            element={
              <ProtectedRoute user={user}>
                <HomeCriarPublicacao />
              </ProtectedRoute>
            }
          />
          <Route
            path="/homePerfil"
            element={
              <ProtectedRoute user={user}>
                <HomePerfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editarPerfil"
            element={
              <ProtectedRoute user={user}>
                <EditarPerfil />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
