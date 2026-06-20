import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroUsuario from "./pages/Cadastro Usuário";
import Login from "./pages/Login";
import EventoDescricao from "./pages/Descrição do Evento";
import CadastroEvento from "./pages/Cadastro de Evento";
import CadastrarEvento from "./pages/Cadastrar Evento";
import Ranking from "./pages/Ranking";
import Recompensas from "./pages/Recompensas";
import RecompensasInstitucional from "./pages/Recompensas Institucional";
import VisualizacaoEventosInscritos from "./pages/Visualização Eventos Inscritos Voluntário";
import AvaliacaoEvento from "./pages/Avaliação Usuário";
import AvaliacaoInstituicao from "./pages/Avaliação Instituição";
import Eventos from "./pages/Eventos";
import Home from "./pages/Home";
import ForgotPassword from "./pages/Esqueci a senha";
import Acesso from "./pages/Papéis de acesso";
import RedefinirSenha from "./pages/Redefinir senha";
import CadastroInstituicao from "./pages/Cadastro Instituição";
import EventosCriados from "./pages/Meus eventos criados";

import PrivateRoute from "./components/privateroute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/cadastro-instituicao" element={<CadastroInstituicao />} />
        <Route path="/cadastro-voluntario" element={<CadastroUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/acesso" element={<Acesso />} />
        <Route path="/home" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventodescricao" element={<EventoDescricao />} />
        <Route path="/ranking" element={<Ranking />} />

        {/* VOLUNTÁRIO */}
        <Route
          path="/recompensas"
          element={
            <PrivateRoute perfil="VOLUNTARIO">
              <Recompensas />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventosinscritos"
          element={
            <PrivateRoute perfil="VOLUNTARIO">
              <VisualizacaoEventosInscritos />
            </PrivateRoute>
          }
        />

        <Route
          path="/evento/:id/avaliacao"
          element={
            <PrivateRoute perfil="VOLUNTARIO">
              <AvaliacaoEvento />
            </PrivateRoute>
          }
        />

        {/* INSTITUIÇÃO */}
        <Route
          path="/cadastroevento"
          element={
            <PrivateRoute perfil="INSTITUICAO">
              <CadastroEvento />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastrarevento"
          element={
            <PrivateRoute perfil="INSTITUICAO">
              <CadastrarEvento />
            </PrivateRoute>
          }
        />

        <Route
          path="/recompensasinstitucional"
          element={
            <PrivateRoute perfil="INSTITUICAO">
              <RecompensasInstitucional />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventoscriados"
          element={
            <PrivateRoute perfil="INSTITUICAO">
              <EventosCriados />
            </PrivateRoute>
          }
        />

        <Route
          path="/evento/:id/avaliacaoresumo"
          element={
            <PrivateRoute perfil="INSTITUICAO">
              <AvaliacaoInstituicao />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
