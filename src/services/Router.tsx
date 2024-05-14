import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/sign-up/SignUp";
import HomePerfil from "../pages/home/HomePerfil";
import CriarPublicacao from "../pages/criarPublicacao/CriarPublicacao";
import Login from "../pages/login/Login";
import EditarPerfil from "../pages/edit-perfil/EditarPerfil";
import { ProtectedRoute } from "../components/protectedRoute";
import ResetPassword from "../pages/resetPassword";
import { useMediaQuery } from "@chakra-ui/react";
import HomeMobile from "../pages/home/HomeMobile";
import CriarPublicacaoMobile from "../pages/criarPublicacao/CriarPublicacaoMobile";

function Router() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<Login />}
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              authenticatedRoute={isMobile ? <HomeMobile /> : <Home />}
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />

        <Route
          path="/criarPublicacao"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <CriarPublicacaoMobile /> : <CriarPublicacao />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/homePerfil"
          element={
            <ProtectedRoute
              authenticatedRoute={<HomePerfil />}
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />
        <Route
          path="/editarPerfil"
          element={
            <ProtectedRoute
              authenticatedRoute={<EditarPerfil />}
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<SignUp />}
            />
          }
        />

        <Route
          path="/resetPassword"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<ResetPassword />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;