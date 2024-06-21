import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SignUp from "../pages/sign-up/SignUp";
import HomePerfil from "../pages/perfil/HomePerfil";
import CriarPublicacao from "../pages/criarPublicacao/CriarPublicacao";
import Login from "../pages/login/Login";
import EditarPerfil from "../pages/edit-perfil/EditarPerfil";
import { ProtectedRoute } from "../components/protectedRoute";
import ResetPassword from "../pages/resetPassword";
import { useMediaQuery } from "@chakra-ui/react";
import HomeMobile from "../pages/home/HomeMobile";
import CriarPublicacaoMobile from "../pages/criarPublicacao/CriarPublicacaoMobile";
import PasswordReset from "../pages/resetPassword/PasswordReset";
import SignUpConfirm from "../pages/sign-up/ConfirmPage";
import EditarPerfilMobile from "../pages/edit-perfil/EditarPerfilMobile";
import HomePerfilMobile from "../pages/perfil/HomePerfilMobile";
import PerfilUsuario from "../pages/perfil/PerfilUsuario";
import PerfilUsuarioMobile from "../pages/perfil/PerfilUsuarioMobile";
import BuscarPerfil from "../pages/home/BuscarPerfil";
import BuscarPerfilMobile from "../pages/home/BuscarPerfilMobile";
import FiltrarPostagem from "../pages/filtrarPostagem";
import PostagensFiltradas from "../pages/filtrarPostagem/PostagensFiltradas";
import PostagensFiltradasMobile from "../pages/filtrarPostagem/PostagensFiltradasMobile";
import FiltrarPostagemMobile from "../pages/filtrarPostagem/indexMobile";
import PageEventoCriar from "../pages/eventos/PageEventoCriar";
import PageCriarEventoMobile from "../pages/eventos/PageEventoCriarMobile";

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

        <Route
          path="/filtrar-postagem"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <FiltrarPostagemMobile /> : <FiltrarPostagem />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/eventos"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <PageCriarEventoMobile /> : <PageEventoCriar />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/postagens-filtradas"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <PostagensFiltradasMobile /> : <PostagensFiltradas />
              }
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
          path="/buscar-perfil"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <BuscarPerfilMobile /> : <BuscarPerfil />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/homePerfil"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <HomePerfilMobile /> : <HomePerfil />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/perfil-usuario"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <PerfilUsuarioMobile /> : <PerfilUsuario />
              }
              noAuthRoute={<Navigate to={"/login"} />}
            />
          }
        />

        <Route
          path="/editarPerfil"
          element={
            <ProtectedRoute
              authenticatedRoute={
                isMobile ? <EditarPerfilMobile /> : <EditarPerfil />
              }
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
          path="/resetar-senha"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<ResetPassword />}
            />
          }
        />
        <Route
          path="/resetar-senha-pin"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<PasswordReset />}
            />
          }
        />
        <Route
          path="/cadastro-confirmacao"
          element={
            <ProtectedRoute
              authenticatedRoute={<Navigate to={"/home"} />}
              noAuthRoute={<SignUpConfirm />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
